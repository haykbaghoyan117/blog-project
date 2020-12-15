import React, { Component } from 'react';
import { auth } from '../../firebase'


class HomePage extends Component {

    componentDidUpdate() {
        console.log(auth.email)
    }
  
    render() {
        return(
            <div>HomePage</div>
        )
    }
}
export default HomePage;