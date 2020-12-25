import React, { Component } from 'react';
import { db } from '../../firebase'
import { connect } from 'react-redux';
import { setPosts } from '../../store/actions'
import Spinner from '../../components/spinner';

class HomePage extends Component {

    state = {
        comment: ''
    }

    componentDidMount() {
        this.sendPostsData()
    }

    sendPostsData = async () => {
        const { setPosts } = this.props;
        await db.ref().on( 'value', snap => setPosts(snap.val()) );
    }

    deletePost = async ({ target: {id} }) => {
        await db.ref().child(id).remove();
    }

    handleChange = ({ target: {value} }) => {
        this.setState({ comment: value })
    }

    addComment = (id) => (event) => {
        event.preventDefault();
        
    }
  
    render() {
        const { posts } = this.props.posts;


        return(
            <>
            {
                posts === null? (
                    <Spinner />
                )
                :
                (
                    Object.values(posts).map(
                        el => Object.values(el).map(
                            el => {
                                    return (
                                        <div>
                                            <h1>{ el.title }</h1>
                                            <img alt='aly' src={ el.fileUrl } />
                                            <p>{ el.description }</p>
                                            <form onSubmit={this.addComment(el.id)}>
                                                <input
                                                    type='text'
                                                    placeholder='Add comment'
                                                    onChange={this.handleChange}
                                                    id={el.id}
                                                />
                                                <input
                                                    className='btn btn-primary'
                                                    type='submit'
                                                    placeholder='Add comment'
                                                    value='Send'
                                                />
                                            </form>
                                            <input
                                                className='btn btn-danger'
                                                type='button'
                                                value='Delete post'
                                                id={el.id}
                                                onClick={this.deletePost}
                                            />
                                        </div>
                                    )
                                }
                            
                        )
                    )
                )
            }
            </>
        )
    }
}

const mapStateToProps = ({ user, posts }) => {
    return { user, posts }
}

const mapDispatchToProps = {
    setPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);