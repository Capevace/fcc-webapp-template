import React from 'react';
import ReactDOM from 'react-dom';

require('./scss/index.scss');

function App() {
  return <div><button className="btn btn-primary">Click</button></div>;
}

ReactDOM.render(<App />, document.getElementById('app'));
