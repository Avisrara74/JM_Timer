import * as React from 'react';
import * as ReactDOM from 'react-dom';
// @ts-ignore
import App from './components/app.tsx';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
