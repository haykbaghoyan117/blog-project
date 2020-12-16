import React, { Component } from 'react';
import { connect } from 'react-redux'


class HomePage extends Component {

    componentDidUpdate() {
        console.log('----->', this.props)
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