import React, { Component } from 'react';
import './style.css';

class Footer extends Component {
    render() {
        return (
            <footer className=" text-dark text-justify text-lg-start mt-5 xxx">
                <div className="container mt-6 p-4">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                            <h5 className="text-uppercase">Find a store</h5>
                            
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis
                                molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam
                                voluptatem veniam, est atque cumque eum delectus sint!
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        </div>
                        <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                            <h5 className="text-uppercase">quick links</h5>

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