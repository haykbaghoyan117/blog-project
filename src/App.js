import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import HomePage from './pages/home-page';
import SignIn from './pages/sign-in';
import SignUp from './pages/sign-up';
// import ChangeProfile from './pages/change-profile';
import ProfilePage from './pages/profile-page';
import { auth } from './firebase'
import { connect } from 'react-redux';
import { setUser } from "./store/actions";
import AdminPage from './pages/admin-page';
import ScrollTop from "./components/scroll-top";

class App extends Component {
    async componentDidMount() {
        await auth.onAuthStateChanged(authUser => this.props.setUser(authUser));
    }
    render() {
        return(
            <div>
                <Router>
                    <Header />
                    <ScrollTop />
                    <Switch>
                        <Route path='/' exact component={HomePage} />
                        <Route path='/sign-up' component={SignUp} />
                        <Route path='/sign-in' component={SignIn} />
                        {/* <Route path='/change-profile' exact component={ChangeProfile} /> */}
                        <Route path='/profile-page' exact component={ProfilePage} />
                        <Route path='/profile-page/:id' exact component={ProfilePage} />
                        <Route path='/admin-page' exact component={AdminPage} />
                        <Redirect to='/' />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state
}

const mapDispatchToProps = {
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);