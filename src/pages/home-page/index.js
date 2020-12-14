import React, { Component } from 'react';
import { db } from '../../firebase'


class HomePage extends Component {

    state = {
        name: ''
    }

    componentDidMount() {
        const name = db.ref('/uid/');
        console.log(name.get().then(res => console.log(res.val())))
        name.on('value', (elem) => {
            console.log(elem.val())
            this.setState({name: elem.val()})
        })   
    }
  
    
    
    render() {
        const { name } = this.state;
        console.log(name)
        return(
            <div>HomePage</div>
        )
    }
}
export default HomePage;