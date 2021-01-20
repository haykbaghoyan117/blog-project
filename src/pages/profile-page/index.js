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
            rndNumber: 0,
            id: '',
            i: 3,
            treePosts = {}
        }

        async componentDidMount() {

            
            if(this.props.posts) {
                this.setState({ rndNumber: Object.keys(this.props.posts).length })
            }
            
            if(this.props.user?.user?.email === 'admin@gmail.com') {
                this.setState({ display: 'block'})
            }
            if(this.props.match.params.id) {
                this.setState({ id: this.props.match.params.id, i: 4 });
                await db.ref().orderByKey().equalTo(`${this.props.match.params.id}`).on('value', snap => {
                    if(snap.val()) {
                        this.setState({ post:snap.val()[this.props.match.params.id], emptyPost: false });

                    }else{
                        this.setState({emptyPost: true})
                    }
                })

            }
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
        const obj = new Object();
        const numberOfPosts = Object.keys(this.props.posts).length;
        for( const i of numberOfPosts ) {
            const randomIndex = Math.floor(Math.random() * numberOfPosts);
            const idx = Object.getOwnPropertyNames(this.props.posts)[ randomIndex ];
            let k = 0;
            if( idx !== this.props.match.params.id ) {
                obj.idx = this.props.posts.posts[idx]
            }
        }
        return(
            <>
            {this.state.emptyPost &&  <h1>Has not selection post</h1>}
            {
                
                this.state.post?.post &&
                (
                    <div>
                        <h1>{this.state.post.post.title}</h1>
                        <img alt='alt' src={this.state.post.post.fileUrl} />
                        <p>{this.state.post.post.description}</p>
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
            
            {this.state.post?.comments !== undefined && Object.values(this.state.post.comments).map(com => {
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






                {/* <FormPost posts={this.props.randPosts} /> */}
{/* 
                (
                    <Spinner />
                )
                :
                (
                    <div className='container-fluid'>
                        <div className='row'>
                            {
                                Object.entries(this.props.posts).map(
                                    ([key, el]) => {
                                        this.props.setSelectionPost(key);
                                        return (
                                            <div className='col-md-4 all-posts'>
                                                <div className="card-columns form-style">
                                                    <div className="card all-form">
                                                        <div>
                                                            <h4>{el.post.title}</h4>
                                                        </div>
                                                        <div className='super-ramka'>
                                                            <div className="lent"/>
                                                            <img className="card-img-top form-img" src={el.post.fileUrl} alt="Card image" />
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text">{el.post.description}</p>
                                                            <Link className="btn btn-secondary post-details" to={`/profile-page/${key}`} >Post details</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                )

                            }
                        </div>
                    </div>
                ) */}


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