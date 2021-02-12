import React, { Component } from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';
import { setPosts, randPosts, setSelectionPost } from "../../store/actions";
import FormPost from '../../components/form-post';
import './style.css';
import Comment from '../../components/comment';


class ProfilePage extends Component {
    state = {
        comment: '',
        post: null,
        emptyPost: false,
        display: 'none',
        id: '',
        allPostsId: [],
        treePosts: {},
        randomList: null
    }

    async componentDidMount() {
        const { setPosts } = this.props;
        await db.ref().on('value', snap => {
            setPosts(snap.val());
            this.setState({ randomList: this.getRandomPostLists() });
        });

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
        if (this.props.posts.posts) {
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
        this.setState({ post: null });
        window.scrollTo(0, 0)
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ comment: e.target.value })
    }
    addComment = (id) => async (e) => {
        e.preventDefault();
        if(!this.props.user.user) {
            return this.props.history.push('/sign-in')
        }
        e.target[0].value && await db.ref().child(id).child('comments').push({
            'displayName': this.props.user?.user?.displayName,
            'comment': e.target[0].value
        });
        e.target[0].value = ''
    }
    render() {
        let i = 1;
        if (!this.props.posts.posts) return null;
        const key = this.props.match.params.id;
        const d = new Date(100000000000000 - key);
        const date = `${d.toLocaleString("en-US", { month: "short" })} ${d.toLocaleString("en-US", { day: "numeric" })}th ${d.toLocaleString("en-US", { year: "numeric" })}`
                                        

        const onePost = this.props.posts?.posts[this.props.match.params.id];
        return (
            <div className='container pb-5' >
                {this.state.emptyPost && <h1>Has not selection post</h1>}
                {
                    onePost &&
                    (
                        <div>
                            <h1 className='mt-5'>{onePost.post.title}</h1>
                            <div className='d-flex mt-4'>
                                <label className='btn btn-danger'>{onePost.post?.categories === '' ? 'not choose' : onePost.post.categories}</label>
                                <div className='ml-4 mt-2'>{date}</div>
                            </div>
                            <img className='mt-4 profile-page-img' alt='alt' src={onePost.post.fileUrl} />
                            <p className='container p-5 text-justify'>{onePost.post.description}</p>
                                        
                            <input
                                className='btn btn-danger mb-4'
                                type='button'
                                value='Delete post'
                                onClick={this.deletePost(this.props.match.params.id)}
                                style={{ display: this.state.display }}
                            />
                        </div>
                    )

                }

                {onePost?.comments !== undefined && Object.values(onePost.comments).map(com => {
                    i++;
                    return (
                        <div key={i}>
                            <Comment userDisplayName={ com.displayName } commentText={ com.comment } />
                        </div>
                    )
                })
                }
                {
                    this.state.post?.post && (
                        <form onSubmit={this.addComment(this.props.match.params.id)}>
                            <textarea className='form-control col-12' id="w3review" name="w3review" rows="4" cols="50" placeholder='Add your comment'></textarea>
                            <input
                                className='btn btn-primary col-12'
                                type='submit'
                                value='Send'
                            />
                        </form>

                    )
                }
                { this.state.randomList && <FormPost allPosts={this.generatePostObj(this.state.randomList)} history={this.props.history} />}
            </div>
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