import React, { Component } from 'react';
import { signInWithEmailAndPassword } from "../../firebase/auth";
import { browserHistory } from 'react-router';


class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    componentDidMount() {
        console.log('----> did mount', this.state)
    }
    

    componentDidUpdate(prevProps, prevState) {
        console.log('---> did update', this.state)
    }

    handleChange = ({ target: {value, id}}) => {
        this.setState({
            [id]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, name } = this.state;
        return signInWithEmailAndPassword(email, password)
            .then(obj => console.log(obj, browserHistory.push('/')))
            .catch(err => alert(err))
    }

    render() {
        return (
            <div>
                <h3>Sign In</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        )
    }
}
export default SignIn;