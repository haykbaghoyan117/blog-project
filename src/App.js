import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import HomePage from './pages/home-page';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
import ChangeProfile from './pages/change-profile';
import ProfilePage from './pages/profile-page';
import AdminPage from './pages/admin-page';
import * as firebase from './firebase/';
import { connect } from 'react-redux';
import * as actions from "./store/actions/user";

class App extends Component {
    componentDidMount() {
        // firebase.auth.onAuthStateChanged((authUser) => this.props.setUser(authUser));
    }
    render() {
        return(
            <div>
                <Router>
                    <Header />
                    <Switch>
                        <Route path='/' exact component={HomePage} />
                        <Route path='/sign-up' exact component={SignUp} />
                        <Route path='/sign-in' exact component={SignIn} />
                        <Route path='/change-profile' exact component={ChangeProfile} />
                        <Route path='/profile-page' exact component={ProfilePage} />
                        <Route path='/admin-page' exact component={AdminPage} />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(App);