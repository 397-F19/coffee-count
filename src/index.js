import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter as Router} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';

let firebaseConfig = {
    apiKey: "AIzaSyAneVIjP-qmSKVLMvlpe8D_E6F_IY_f2fo",
    authDomain: "coffee-count-8305a.firebaseapp.com",
    databaseURL: "https://coffee-count-8305a.firebaseio.com",
    projectId: "coffee-count-8305a",
    storageBucket: "",
    messagingSenderId: "1029854115216",
    appId: "1:1029854115216:web:fce7fb206127be84396f15"
  };
firebase.initializeApp(firebaseConfig);

ReactDOM.render( 
    <MuiThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL} >
            <App />
        </Router>
    </MuiThemeProvider>
, document.getElementById('root'));
/**
 * Service worker is activated but doesn't do much other than default
 * react service worker code.
 * Things to be implemented: cache, indexdb, complete offline mode
 */
serviceWorker.register();