import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
    render() {
        return (
            <footer className=" text-dark text-justify text-lg-start mt-5 xxx">
                <div className="container mt-2">
                    <div className="row">
                        <div className="justify-content-center col-lg-12 col-md-12 d-flex mb-4 mb-md-0">
                            <h3><strong>Get the latest deals and more</strong></h3>
                            <input placeholder='Enter email address' />
                            <input type='button' className='btn btn-danger' value='Sign Up' />
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h3 className="text-uppercase">quick links</h3>

                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="#!" className="text-primary">Home</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-primary">Store</a>
                                </li>
                                <li>
                                    <a href="#!" className="text-primary">About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3">
                    © {new Date().getFullYear()} Copyright:
                    <a className="text-dark" href="https://mdbootstrap.com/">Paradise production</a>
                </div>
                <button onClick={() => {window.scrollTo(0, 0)}}>^</button>
            </footer>
        )
    }
}
export default Footer;