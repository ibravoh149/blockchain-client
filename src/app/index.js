import React from 'react';
import ReactDOM from 'react-dom';
import './public/css/bootstrap.min.css';
import './index.css';
import { Provider } from 'react-redux';
import store from './helpers/store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import  Routes from './routes';
import updateUserState from './helpers/updateUserState';


window.store= store;
updateUserState(store);

ReactDOM.render(
<Provider store={store}>
<Router>
    <Routes />
</Router>
</Provider>
, document.getElementById('root'));
