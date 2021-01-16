import React, { Component } from 'react';
import { db } from '../../firebase';
import { setPosts } from '../../store/actions';
import { connect } from "react-redux";

class SearchCategories extends Component {

    state = {
        categories: ''
    }

    filterCategories = async ({ target: {value} }) => {
        const { setPosts } = this.props;
        await this.setState({ categories: value});
        if(this.state.categories === 'All') {
            await db.ref().on('value', snap => setPosts(snap.val()));
        }else await db.ref().orderByChild('post/categories').equalTo(`${value}`).on('value', snap => setPosts(snap.val()));
    }

    render() {
        return (
            <div className="dropdown">
                <input
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    value={`Categories: ${this.state.categories}`}
                />
                <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <input className="dropdown-item" type="button" value='All' onClick={this.filterCategories} />
                    <input className="dropdown-item" type="button" value='Animals' onClick={this.filterCategories} />
                    <input className="dropdown-item" type="button" value='Nature' onClick={this.filterCategories} />
                    <input className="dropdown-item" type="button" value='News' onClick={this.filterCategories} />
                    <input className="dropdown-item" type="button" value='Sport' onClick={this.filterCategories} />
                    <input className="dropdown-item" type="button" value='Cars' onClick={this.filterCategories} />
                    <input className="dropdown-item" type="button" value='Happy' onClick={this.filterCategories} />
                </div>
            </div>
        )

    }

}


const mapStateToProps = ({ post }) => {
    return { post }
}

const mapDispatchToProps = {
    setPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchCategories);