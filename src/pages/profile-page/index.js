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
            postsLength: 0,
            id: '',
            allPostsId: [],
            treePosts: {}
        }

        async componentDidMount() {
            
            if(this.props.posts) {
                this.setState({ postsLength: Object.keys(this.props.posts.posts).length })
            }
            
            if(this.props.user?.user?.email === 'admin@gmail.com') {
                this.setState({ display: 'block'})
            }
            if(this.props.match.params.id) {
                this.filterPosts(this.props.match.params.id);
                await db.ref().orderByKey().equalTo(`${this.props.match.params.id}`).on('value', snap => {
                    if(snap.val()) {
                        this.setState({ post:snap.val()[this.props.match.params.id], emptyPost: false });

                    }else {
                        this.setState({emptyPost: true})
                    }
                })
            }else {
                this.filterPosts(1);
            }

            this.allPosts();
        }

        filterPosts = (id) => {
            const arr1 = [];
            Object.keys(this.props.posts.posts).map(key => {
                if(+key !== +id) {
                    arr1.push(+id)
                }
            })
            this.setState({ allPostsId: arr1 })
        }

        allPosts = () => {
            const obj = {};
            let arr = [];
            const array = this.state.allPostsId;
            if(array.length > 3) {
                for(let i = 0; i < 3; i++) {
                    const rnd = Math.floor(Math.random() * array.length);
                    if( arr.includes(array[rnd]) ) {
                        return --i;
                    }else {
                        arr.push(array[rnd])
                    }
                }console.log('+++++++', arr)
            }else {
                return arr = array;
            }

            arr.map(id => {
                obj[id] = this.props.posts.posts[id]
            })

            this.setState({ treePosts: obj })
        }
        
        treeRandId = (id) => {
            const lengthOfPosts = Object.keys(this.props.posts).length;
            const arr = [];
            if( this.state.id !== '' ) {
                arr.push(this.state.id * 1)
            }
            arr.indexOf(2)
            if( lengthOfPosts < 3 )
            for( let i = 0; i < 3; i++ ) {
                const randomIndex = Math.floor(Math.random() * lengthOfPosts);
                const idx = Object.getOwnPropertyNames(this.props.posts)[ randomIndex ];
                if( idx * 1 === this.props.match?.params.id * 1 ) {
                    return --i;
                }
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
        console.log('*********', this.state)
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






                <FormPost posts={this.state.treePosts} />



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