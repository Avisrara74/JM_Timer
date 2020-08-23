import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/extensions
import App from './components/app';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
