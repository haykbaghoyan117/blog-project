import React, { Component } from 'react';

class SignIn extends Component {
    render() {
        return (
            <div>
                <h3>Sign-Up</h3>
                <form action="/action_page.php">
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <div className="checkbox">
                        <label><input type="checkbox" />Sign In</label>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        )
    }
}
export default SignIn;