import React, { Component } from 'react';
import { db } from '../../firebase'
import { connect } from 'react-redux';

class HomePage extends Component {

    state = {
        title: '',
        imgUrl: null,
        description: ''
    }

    componentDidMount() {
        this.readData();
        console.log('---> home page', this.state)
        if(this.props.user.user && this.props.user.user.email === 'admin@gmail.com'){
            return (
                this.props.history.push('/admin-page')
            )
        }
    }
    
    componentDidUpdate() {

    }

    readData = async () => {
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
                {
                    console.log('--> state', this.state)
                    // Object.keys(this.state).map((key, i) => {
                    //     console.log('----> key', key)
                    // })
                }
                <h3>{ title }</h3>
                <img alt='alt' src={ imgUrl } />
                <p>{ description }</p>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return { user }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);