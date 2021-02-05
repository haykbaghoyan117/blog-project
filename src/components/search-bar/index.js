import React, { Component } from 'react';
import './style.css';

class SearchBar extends Component {
    
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ text: e.target.value });
    }

    render() {
        return (
        <div className='ggg'>
            <label><input className='fff' type="text" id="search-bar" /><span className="search-icon"><i class="fas fa-search"></i></span></label>
        </div>
        )

    }

}


export default SearchBar;