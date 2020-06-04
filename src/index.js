import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './components/timer';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Timer />, document.getElementById('root'));

serviceWorker.unregister();
