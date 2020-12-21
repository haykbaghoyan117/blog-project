import React, { Component } from 'react';
import { connect } from 'react-redux'


class HomePage extends Component {

    componentDidMount() {
        if(this.props.user.user.email === 'admin@gmail.com'){
            return (
                this.props.history.push('/admin-page')
            )
        }
    }
    

    componentDidUpdate() {
        console.log('home page', this.props)
    }
  
    render() {
        return(
            <div>HomePage</div>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);