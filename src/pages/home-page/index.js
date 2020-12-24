import React, { Component } from 'react';
import { db } from '../../firebase'
import { connect } from 'react-redux';
import { setPosts } from '../../store/actions'
import Spinner from '../../components/spinner';

class HomePage extends Component {

    componentDidMount() {
        this.sendPostsData()
    }

    sendPostsData = async () => {
        const { setPosts } = this.props;
        await db.ref().on( 'value', snap => setPosts(snap.val()) );
    }

    deletePost = ({ target }) => {
        console.log('+++++>', target.id)
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
                                if(el.title) {
                                    return <h3>{ el.title }</h3>
                                }else if(el.fileUrl) {
                                    return <img alt='alt' src={ el.fileUrl } />
                                }else if(el.description) {
                                    return <p>{ el.description }</p>
                                }else if(el.id) {
                                    return (
                                        <div>
                                            <form>
                                                <input
                                                    type='text'
                                                    placeholder='Add comment'
                                                />
                                                <input
                                                    className='btn btn-primary'
                                                    type='button'
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