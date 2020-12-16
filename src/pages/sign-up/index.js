import React, { Children, Component } from 'react';
import { signUpWithEmailAndPassword } from "../../firebase";

class SignUp extends Component {

    state = {
        email: '',
        password: '',
        name: ''
    }


    handleChange = ({ target: {value, id}}) => {
        this.setState({
            [id]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, name } = this.state;
        return signUpWithEmailAndPassword(email, password)
        .then((user) => {
           user.user.updateProfile({
            displayName: this.state.name
            }); console.log(user)

        }).then(user => console.log(user))
      
            // .then(() => this.props.history.push('/'))
            .catch(err => {
                alert(err);
                this.setState({
                    email: '',
                    password: '',
                    name: ''
                })
            })
    }
    

    render() {
        const { email, password, name } = this.state;
        return (
            <div>
                <h3>Sign Up</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Name:</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={this.handleChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        )
    }
}
export default SignUp;