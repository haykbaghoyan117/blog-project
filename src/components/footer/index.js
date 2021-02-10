import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
    render() {
        return (
            <footer className="text-dark text-center text-md-start xxx">
                <div className="container-fluid">
                    <div className="row">
                        <div className="d-md-flex justify-content-center col-12 p-5 mb-md-0 footer-header">
                            <h3><strong className='d-sm-flex justify-content-sm-center d-flex justify-content-center'>Get the latest deals and more</strong></h3>
                            <div className='d-sm-flex justify-content-sm-center d-flex justify-content-center'>
                                <input placeholder='Enter email address' className='ml-md-2' />
                                <input type='button' className='btn btn-danger' value='Sign Up' />
                            </div>
                        </div>
                        <div className="container mt-5">
                            <div className="row text-lg-left">
                                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                    <h3 className='text-lg-left text-sm-center text-center'>Find a store</h3>

                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <div className='d-flex justify-content-lg-start justify-content-center'>
                                                <input placeholder='City or zip code' className='search-foot' />
                                                <button type='button' className='btn btn-danger'><i class="fas fa-search"></i></button>
                                            </div>
                                        </li>
                                        <li className='d-flex justify-content-lg-start justify-content-center'>
                                            <p className="mt-2 search-footer-t">Enter your city or zip code to find a store near you</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-4 mb-md-0 text-lg-left">
                                    <h3>Quick Links</h3>

                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <a href="#!" className="text-dark">Home</a>
                                        </li>
                                        <li>
                                            <a href="#!" className="text-dark">Store</a>
                                        </li>
                                        <li>
                                            <a href="#!" className="text-dark">About Us</a>
                                        </li>
                                        <li>
                                            <a href="#!" className="text-dark">Blog</a>
                                        </li>
                                        <li>
                                            <p className="text-dark">FAQ</p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                    <h3>Contact Us</h3>

                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <p>Tumanyan 11, Yerevan, Armenia</p>
                                        </li>
                                        <li>
                                            <address>info@xaxalove.com</address>
                                        </li>
                                        <li>
                                            <h6><strong>Social Media</strong></h6>
                                        </li>
                                        <li className='mt-3'>
                                            <h6>
                                                <i className="fab fa-instagram"></i>
                                                <i className="fab fa-facebook-f ml-4"></i>
                                                <i className="fab fa-twitter ml-4"></i>
                                                <i className="fab fa-pinterest-p ml-4"></i>
                                            </h6>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                                    <h3>Payment methods</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center p-3 mt-3">
                    © {new Date().getFullYear()}
                </div>
            </footer>
        )
    }
}
export default Footer;