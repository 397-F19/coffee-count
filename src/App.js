import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Add from './components/Add';
import User from './components/User';
import History from './components/History';
import Login from './components/Login';
import Navigation from './Navigation';
import backend from './components/firebaseCalls';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        backend.init();
        this.load = this.loading();
        backend.login.isLoggedIn((e) => {
            if(e && localStorage.getItem('uid')){
                this.redirect(e);
            }else{
                backend.login.check(this.successfulLogin, () => { props.history.push('/'); this.finishLoad(); });
            }
        })
        this.update = React.createRef();
    }
    state = {
        add: false,
        user: false,
        value: '',
    };
    toggle = (item) => {
        this.setState(state => ({ [item]: !state[item] }));
        this.update.current.update();
    }
    handleChange = (event, value) => { this.setState({ value }) };
    loading = () => {
        let fullscreenImage = document.createElement('div');
        fullscreenImage.className = "loading-background";
        fullscreenImage.insertAdjacentHTML('beforeend', `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`);
        document.body.appendChild(fullscreenImage);
        return fullscreenImage;
    }
    finishLoad = () => {
        document.body.removeChild(this.load);
    }
    /**
     * @function successfulLogin - handles a successful login
     * @param {*} r - firebase auth response
     * 
     * @description Login does multiple checks and then goes through
     * login phase.
     * 
     * First check - if this is a new device or a new user on current device
     * If true, it will clear the localstorage and fill it with the new user's
     * information
     * 
     * Second check - if user is brand new, generate a defualt profile for them
     * 
     * After checks, should redirect to dashboard page
     */
    successfulLogin = ( r ) => {
        localStorage.clear();
        localStorage.setItem( 'avatar', r.additionalUserInfo.profile.picture.data.url );
        localStorage.setItem( 'fname', r.additionalUserInfo.profile.first_name );
        localStorage.setItem( 'uid', r.user.uid );
        if(r.additionalUserInfo.isNewUser){
            backend.user.setup(this.getDrinksAndRedirect);
            return;
        }
        backend.user.get(this.getDrinksAndRedirect);
    }
    getDrinksAndRedirect = () => {
        backend.drinks.get( () => { 
            this.redirect();
        });
    }
    redirect = () => {
        this.props.history.push('dash');
        this.finishLoad();
    }
    componentDidCatch = ( ) => {
        localStorage.clear();
        window.location = window.location.origin;
    }
    render() {
        const s = this.state;
        return (
            <Switch>
                <Route exact strict path='/' render={() => <Login successfulLogin = { this.successfulLogin }/> }/>
                <Route strict path='/:page' render={() => 
                    <div className="app">
                        <div className="page">
                            <img 
                                src={localStorage.getItem('avatar')}
                                alt="user-settings"
                                className="avatar-button"
                                onClick={() => this.toggle('user')}
                            />
                            <Route exact path='/dash' render={() => <Dashboard ref={this.update} /> }/>
                            <Route exact path='/history' render={() => <History ref={this.update} /> }/>
                        </div>

                        <Add open={s.add} close={() => this.toggle('add')} />
                        <User open={s.user} close={() => this.toggle('user')} />
                        <Navigation value={s.value} handleChange = {this.handleChange} toggleAdd={() => this.toggle('add')} />
                    </div>
                } />
                <Route render={() => <Login successfulLogin = { this.successfulLogin }/> }/>
            </Switch>
        );
    }
}

export default withRouter(App);