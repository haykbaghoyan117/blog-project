import React, { Component } from 'react';
import { signInWithEmailAndPassword } from "../../firebase";
import { connect } from 'react-redux';
import { setUser } from '../../store/actions';
import './style.css';

class SignIn extends Component {

    state = {
        email: '',
        password: '',
        type: 'password',
        clazz: 'fas fa-eye',
        text: '',
        changedText: ''
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
                setUser(el.user);
                this.props.history.push('/');
            })
            .catch(err => {
                alert(err);
                this.setState({
                    email: '',
                    password: ''
                })
            })
    }

    showHidden = (e) => {
        e.preventDefault();
        if(this.state.type === 'password') {
            return this.setState({
                type: 'text',
                clazz: 'fas fa-eye-slash'
            })
        }else return this.setState({
            type: 'password',
            clazz: 'fas fa-eye'
        })
    }

    xxx = (text) => {
        let yyy = '';
        if(text !== '') {
            for( let i = 0; i < text.length; i++ ){
                yyy += '*'
            }
        }return yyy
    }

    textChange = async (e) => {
        e.preventDefault();
        const { text } = this.state;
        this.setState({
            text: text + e.target.value[text.length],
            changedText: this.xxx(text + e.target.value[text.length])
        })
    }

    render() {
        const { email, password } = this.state;
        console.log('@@@@@@@@', this.state)
        return (
            <div className='sign-in'>
                <h3>Sign In</h3>
                <input type='text' onChange={this.textChange} value={ this.state.changedText } />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type={this.state.type} className="form-control" id="password" value={password} onChange={this.handleChange} />
                        <span onClick={ this.showHidden }><i className={this.state.clazz}></i></span>
                    </div>
                    <button type="submit" className="btn btn-secondary">Submit</button>
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