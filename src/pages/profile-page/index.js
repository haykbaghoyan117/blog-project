import React, { Component } from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';
import { setPosts, randPosts } from "../../store/actions";
import Spinner from '../../components/spinner';
import FormPost from '../../components/form-post';


class ProfilePage extends Component {
        state = {
            comment: ''
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
                'displayName': this.props.user?.user?.displayName,
                'comment': this.state.comment
            });
            this.setState({ comment: '' })
        }

    render() {
        const { selectionPost } = this.props.selectionPost;
        const { randPosts } = this.props.randPosts;
        // const numberOfPosts = 6;
        // const randomIndex = Math.floor(Math.random() * numberOfPosts);
        // db.ref.limitToFirst(randomIndex).limitToLast(3).once('value').then(snapshot => randPosts(snapshot.val()));
        return(
            <>
             {
                    !selectionPost?
                        (
                            <Spinner />
                        )
                        :
                        (
                            Object.entries(selectionPost).map(
                                ([key, el]) => {
                                    console.log(el)
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

                {/* <FormPost posts={this.props.randPosts} /> */}


            </>
        )
    }
}

const mapStateToProps = ({ user, posts, post, selectionPost, randPosts }) => {
    return { user, posts, post, selectionPost, randPosts }
}

const mapDispatchToProps = {
    setPosts,
    randPosts
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);