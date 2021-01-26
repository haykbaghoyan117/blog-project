import React, { Component } from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';
import { setPosts, randPosts, setSelectionPost } from "../../store/actions";
import Spinner from '../../components/spinner';
import FormPost from '../../components/form-post';


class ProfilePage extends Component {
    state = {
        comment: '',
        post: null,
        emptyPost: false,
        display: 'none',
        id: '',
        allPostsId: [],
        treePosts: {}
    }

    async componentDidMount() {
        if (this.props.user?.user?.email === 'admin@gmail.com') {
            this.setState({ display: 'block' })
        }
        if (this.props.match.params.id) {
            await db.ref().orderByKey().equalTo(`${this.props.match.params.id}`).on('value', snap => {
                if (snap.val()) {
                    this.setState({ post: snap.val()[this.props.match.params.id], emptyPost: false });
                } else {
                    this.setState({ emptyPost: true })
                }
            })
        }
    }
    
    
    getRandomPost = (list) => {
        const { posts } = this.props.posts;
        const detailsId = this.props.match.params.id;
        if (!posts) return null;
        const keysArray = Object.keys(posts);
        if (keysArray.length === 0) return null;
        const randomIndex = parseInt((Math.random() * (keysArray.length - 1)));
        if ((detailsId && detailsId === keysArray[randomIndex]) || list?.has(keysArray[randomIndex])) {
            return this.getRandomPost(list);
        }
        return keysArray[randomIndex];
    }
    limit = () => {
        if (this.props.match.params.id) {
            if (Object.keys(this.props.posts.posts).length > 3) {
                return 3;
            } else return Object.keys(this.props.posts.posts).length - 1;
        } else {
            if (Object.keys(this.props.posts.posts).length > 3) {
                return 3;
            } else return Object.keys(this.props.posts.posts).length;
        }
    }
    getRandomPostLists = () => {
        const ids = new Set();
        for (let i = 0; i < this.limit(); i++) {
            const id = this.getRandomPost(ids);
            ids.add(id);
        }
        return [...ids]
    }
    generatePostObj = (list) => {
       const obj = {};
       list.forEach(el => {
        obj[el] = this.props.posts.posts[el]
       });
       return obj;
    }
    deletePost = (id) => async () => {
        await db.ref().child(id).remove();
        this.setState({ post: null })
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
        const onePost = this.props.posts?.posts[ this.props.match.params.id ];
        return (
            <>
                {this.state.emptyPost && <h1>Has not selection post</h1>}
                {
                    onePost &&
                    (
                        <div>
                            <h1>{onePost.post.title}</h1>
                            <img alt='alt' src={onePost.post.fileUrl} />
                            <p>{onePost.post.description}</p>
                            <input
                                className='btn btn-danger'
                                type='button'
                                value='Delete post'
                                onClick={this.deletePost(this.props.match.params.id)}
                                style={{ display: this.state.display }}
                            />
                        </div>
                    )

                }

                {onePost?.comments !== undefined && Object.values(onePost.comments).map(com => {
                    return (
                        <ul>
                            <li>{com.displayName}</li>
                            <li>{com.comment}</li>
                        </ul>
                    )
                })
                }
                {
                    this.state.post?.post && (
                        <form onSubmit={this.addComment(this.props.match.params.id)}>
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

                    )
                }
          <FormPost  allPosts={this.generatePostObj(this.getRandomPostLists())}/> 
            </>
        )
    }
}

const mapStateToProps = ({ user, posts, post, selectionPost, randPosts }) => {
    return { user, posts, post, selectionPost, randPosts }
}

const mapDispatchToProps = {
    setPosts,
    randPosts,
    setSelectionPost
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);