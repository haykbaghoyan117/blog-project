import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark">

                    <a className="navbar-brand" href="#">Home</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="#">SignIn</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">SignUp</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Profile</a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

            </div>
        )
    }
}
export default Header;