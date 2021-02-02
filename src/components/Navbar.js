import React from 'react'
import {NavLink,Nav} from 'react-router-dom'


class Navbar extends React.Component{
    constructor(props){
        super(props)

    }

    render(){
        return(
            <div>
            <NavLink exact={true} activeClassName='is-active' to='/'>Home</NavLink>
            <NavLink activeClassName='is-active' to='/about'>About</NavLink>

            </div>
       
        )
    }
}


export default Navbar;