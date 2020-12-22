import React, { Component } from 'react';
import { db } from '../../firebase'
import { connect } from 'react-redux';
import { setPosts } from '../../store/actions'

class HomePage extends Component {

    state = {
        title: '',
        imgUrl: null,
        description: ''
    }

    componentDidMount() {
        this.sendPostsData();
        this.readData();
    }

    sendPostsData = async () => {
        const { setPosts } = this.props;
        await db.ref().on( 'child_added', snap => setPosts(snap.val()) );
    }
    
    readData = () => {
        const dbRefPosts = db.ref().child('posts');
        const title = dbRefPosts.child('title');
        title.on('child_added', snap => this.setState({ title: snap.val() }));
        const imgUrl = dbRefPosts.child('imgUrl');
        imgUrl.on('child_added', snap => this.setState({ imgUrl: snap.val() }));
        const description = dbRefPosts.child('description');
        description.on('child_added', snap => this.setState({ description: snap.val() }));
    }
  
    render() {
        const { title, imgUrl, description } = this.state;
        return(
            <React.Fragment>
                <h3>{ title }</h3>
                <img alt='alt' src={ imgUrl } />
                <p>{ description }</p>
            </React.Fragment>
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