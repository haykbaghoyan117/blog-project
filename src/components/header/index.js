import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom";
import { signOut } from '../../firebase';
import { connect } from 'react-redux';
import './style.css';
import logo from '../../images/blogger.png';
import flag from '../../images/flag.jpg';

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

    render() {
        const { user } = this.props.user;
        return (
            <header className='header-1'>
                {
                    !user ?
                        (
                            <nav className="navbar navbar-inline navbar-expand-lg navbar-light">

                                <Link className="navbar-brand" to='/'><img id="logo" src={logo} width='120px' alt='image' /></Link>
                                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                    <ul className="navbar-nav text-bold">
                                        <li className="nav-item">
                                            <NavLink exact className="nav-link link-1 static-link" activeStyle={{ color: "tomato" }} to='/'>Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/shop'>Shop</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/contact'>Contact Us</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/partners'>Partners</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link .d-sm-flex" to='/about'>About Us</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/blog'>Blog</NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <ul class="navbar-nav navbar-right .d-sm-flex flex-row">
                                    <li className="nav-item m-2">
                                        <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/search'>
                                            <i class="fas fa-search"></i>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item m-2">
                                        <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/love'>
                                            <i class="far fa-heart"></i>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item m-2">
                                        <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/cart'>
                                            <i class="fas fa-shopping-cart"></i>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item m-2">
                                        <div className="dropdown">
                                            <button
                                                className='drop'
                                                id="dropdownMenu2"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/user'>
                                                    <i class="fas fa-user-times"></i>
                                                </NavLink>
                                            </button>

                                            <div class="dropdown-menu drop-1">
                                                <li className="nav-item">
                                                    <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/sign-in'>SignIn</NavLink>
                                                </li>
                                                <li className="nav-item">
                                                    <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/sign-up'>SignUp</NavLink>
                                                </li>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="nav-item m-2">
                                        <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/flag'>
                                            <img alt='image' src={flag} width='30px' />
                                        </NavLink>
                                    </li>
                                  
                                </ul>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </nav>





                        )
                        :
                        (
                        <>
                            <nav className="navbar navbar-inline navbar-expand-lg navbar-light">

                                <Link className="navbar-brand" to='/'><img src={logo} width='120px' alt='image' /></Link>
                                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                                    <ul className="navbar-nav text-bold">
                                        <li className="nav-item">
                                            <NavLink exact className="nav-link link-1 static-link" activeStyle={{ color: "tomato" }} to='/'>Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/shop'>Shop</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/contact'>Contact Us</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/partners'>Partners</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link .d-sm-flex" to='/about'>About Us</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to={user.email === 'admin@gmail.com' ? '/admin-page' : '/blog'}>Blog</NavLink>
                                        </li>
                                    </ul>
                                </div>
                                <ul class="navbar-nav navbar-right .d-sm-flex flex-row">
                                    <li className="nav-item m-2">
                                        <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/search'>
                                            <i class="fas fa-search"></i>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item m-2">
                                        <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/love'>
                                            <i class="far fa-heart"></i>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item m-2">
                                        <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/cart'>
                                            <i class="fas fa-shopping-cart"></i>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item m-2">
                                        <div className="dropdown">
                                            <button
                                                className='drop'
                                                id="dropdownMenu2"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false">
                                                <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/user'>
                                                    {
                                                        user.email === 'admin@gmail.com'?
                                                        (<i class="fas fa-user-tie"></i>):
                                                        (<i class="fas fa-user"></i>)
                                                    }
                                                </NavLink>
                                            </button>

                                            <div class="dropdown-menu drop-1">
                                                <li className="nav-item">
                                                    <Link className="nav-link link-1 static-link" to='/' onClick={signOut}>SignOut</Link>
                                                </li>
                                            </div>
                                        </div>
                                    </li>

                                    <li className="nav-item m-2">
                                        <NavLink activeStyle={{ color: "tomato" }} className="nav-link link-1 static-link" to='/flag'>
                                            <img alt='image' src={flag} width='30px' />
                                        </NavLink>
                                    </li>
                                  
                                </ul>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </nav>
                            </>
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