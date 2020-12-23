import React, { Component } from 'react';
import { db } from '../../firebase'
import { connect } from 'react-redux';
import { setPosts } from '../../store/actions'
import Spinner from '../../components/spinner';

class HomePage extends Component {

    state = {
        title: '',
        imgUrl: null,
        description: ''
    }

    componentDidMount() {
        this.sendPostsData();
        // this.readData();
    }

    sendPostsData = async () => {
        const { setPosts } = this.props;
        await db.ref().on( 'value', snap => setPosts(snap.val()) );
    }
    
    // readData = () => {
    //     const dbRefPosts = db.ref().child('posts');
    //     const title = dbRefPosts.child('title');
    //     title.on('child_added', snap => this.setState({ title: snap.val() }));
    //     const imgUrl = dbRefPosts.child('imgUrl');
    //     imgUrl.on('child_added', snap => this.setState({ imgUrl: snap.val() }));
    //     const description = dbRefPosts.child('description');
    //     description.on('child_added', snap => this.setState({ description: snap.val() }));
    // }
  
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