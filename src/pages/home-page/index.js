import React, { Component } from 'react';
import { db } from '../../firebase'
import { connect } from 'react-redux';
import { setPosts } from '../../store/actions'
import Spinner from '../../components/spinner';

class HomePage extends Component {

    state = {
        comment: '',
        displayName: '',
        categories: ''
    }

    componentDidMount() {
        const { user } = this.props.user;
        this.sendPostsData();
        if(user) {
            return this.setState({ displayName: user.displayName })
        }
    }

    sendPostsData = async () => {
        const { setPosts } = this.props;
        await db.ref().on('value', snap => setPosts(snap.val()));
    }

    deletePost = (id) => async () => {
        await db.ref().child(id).remove();
    }

    handleChange = ({ target: { value } }) => {
        this.setState({ comment: value })
    }

    addComment = (id) => async (e) => {
        e.preventDefault();
        await db.ref().child(id).child('comments').push({
            'displayName': this.state.displayName,
            'comment': this.state.comment
        });
        this.setState({ comment: '' })
    }

    filterCategories = async ({ target: {value} }) => {
        const { setPosts } = this.props;
        await this.setState({ categories: value});
        if(this.state.categories === 'All') {
            return await db.ref().on('value', snap => setPosts(snap.val()));
        } else return await db.ref().orderByChild('post/categories').equalTo(`${value}`).on('value', snap => setPosts(snap.val()));
    }

    render() {
        const { posts } = this.props.posts;

        return (
            <>
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
                {
                    posts === null ?
                        (
                            <Spinner />
                        )
                        :
                        (
                            Object.entries(posts).map(
                                ([key, el]) => {
                                    return (
                                        <>
                                            <div>
                                                <h1>{el.post.title}</h1>
                                                <img alt='alt' src={el.post.fileUrl} />
                                                <p>{el.post.description}</p>
                                                <input
                                                    className='btn btn-danger'
                                                    type='button'
                                                    value='Delete post'
                                                    onClick={this.deletePost(key)}
                                                />
                                            </div>
                                            {el.comments !== undefined && Object.values(el.comments).map(com => {
                                                return (
                                                    <ul>
                                                        <li>{com.displayName}</li>
                                                        <li>{com.comment}</li>
                                                    </ul>
                                                )
                                            })
                                            } 
                                            <form onSubmit={this.addComment(key)}>
                                                <input
                                                    type='text'
                                                    placeholder='Add comment'
                                                    value={this.state.comment}
                                                    onChange={this.handleChange}
                                                />
                                                <input
                                                    className='btn btn-primary'
                                                    type='submit'
                                                    value='Send'
                                                />
                                            </form>
                                        </>
                                    )
                                }
                            )
                        )
                }
            </>
        )
    }
}


const mapStateToProps = ({ user, posts }) => {
    return {
        user,
        posts
    }
}

const mapDispatchToProps = {
    setPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);