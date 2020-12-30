import React, { Component } from 'react';
import { signInWithEmailAndPassword } from "../../firebase";
import { connect } from 'react-redux';
import { setUser } from '../../store/actions'

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }

    componentDidMount() {

    }

    handleChange = ({ target: {value, id}}) => {
        this.setState({
            [id]: value
        })
    }

    handleSubmit = (e) => {
        const { setUser } = this.props;
        e.preventDefault();
        const { email, password } = this.state;
        return signInWithEmailAndPassword(email, password)
            .then(el => {
                setUser(el.user)
            })
            .then(() => {
                return this.props.history.push('/');
            })
            .catch(err => {
                alert(err);
                this.setState({
                    email: '',
                    password: ''
                })
            })
    }

    render() {
        const { email, password } = this.state;
        return (
            <div>
                <h3>Sign In</h3>
                <form onSubmit={this.handleSubmit}>
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

const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = {
    setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);