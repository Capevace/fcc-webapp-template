const path = require('path');
const { User } = require('./schemas');

module.exports = (app, passport) => {
  app.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });

  app.get('/login', (req, res) => {
    res.send(`
      <form action="/login" method="post">
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Login</button>
      </form>
    `);
  });

  app.get('/signup', (req, res) => {
    res.send(`
      <form action="/signup" method="post">
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Signup</button>
      </form>
    `);
  });

  app.get('/users', isAuthenticated, (req, res) => {
    User.find({})
      .then(docs => res.json(docs));

  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true
  }));

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/users',
    failureRedirect: '/signup',
    failureFlash : true
  }));
};

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/login');
}
