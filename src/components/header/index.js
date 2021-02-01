import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { signOut } from '../../firebase';
import { connect } from 'react-redux';
import './style.css';
import logo from '../../images/blogger.png';

class Header extends Component {

    // state = {
    //     link: '/'
    // }

    // componentDidMount() {
    //     const { user } = this.props.user;
    //     if(user && user.email === 'admin@gmail.com') {
    //         this.setState({ link: '/admin-page'})
    //     }
    // }

    changeColor = (e) => {
        e.target.className += ' text-danger';
        console.log(e.target.className)
    }

    render() {
        const { user } = this.props.user;
        return (
            <header>
                {
                    !user?
                    (
                        <nav className="navbar navbar-expand-md navbar-dark">
                            
                        <Link className="navbar-brand" to='/'><img src={logo} width='120px' alt='image' /></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link link-1" to='/'>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link link-1" onClick={this.changeColor} href='#'>Shop</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link link-1" onClick={this.changeColor} href='#'>Contact Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link link-1" href='#'>Partners</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link link-1" href='#'>About Us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link link-1" href='#'>Blog</a>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link link-1" to={`/profile-page/${this.props.selectionPost?.selectionPost}`}>Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link link-1" to='/sign-in'>SignIn</Link>
                                </li>
                                <li className="nav-item link-1">
                                    <Link className="nav-link link-1" to='/sign-up'>SignUp</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    )
                    :
                    (
                    <nav className="navbar navbar-expand-md navbar-dark">

                        <Link
                            className="navbar-brand"
                            to='/'>
                            Blog  
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link link-1" to={`/profile-page/${this.props.selectionPost.selectionPost}`}>Profile({user.displayName})</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link link-1" to='/' onClick={signOut}>SignOut</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    )
                }


                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

            </header>
        )
    }
}
const mapStateToProps = ({ user, selectionPost }) => {
    return { user, selectionPost }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);