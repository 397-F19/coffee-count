import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import './styles/login.css';
import backend from './firebaseCalls';

let ar = () => { return window.innerHeight/window.innerWidth < 1.2 }

export class Login extends Component {
    state = { ar: ar() }
    componentDidMount = () => { window.addEventListener( 'resize', () => this.setState({ ar: ar() } ) ) }
    handleClose = () => { this.setState({ ar: false }) }
    loggedIn = ( r ) => { this.props.successfulLogin( r ) };

    render() {
        return (
        <div className="login-page">
            <div className="login-logo"></div>
            <Typography variant="h1">coffee count</Typography>
            <button className="fb-button" onClick={ () => backend.login.attempt( this.loggedIn ) }> Log in with Facebook </button>
        </div>
        )
    }
}

export default withRouter(Login);
