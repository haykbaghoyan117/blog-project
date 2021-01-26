import React, { Component } from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';
import { setPosts, setPost, setSelectionPost } from '../../store/actions';
import FormPost from '../../components/form-post';
import SearchCategories from '../../components/search-categories';
import AdminAddForm from '../../components/admin-add-form';

class HomePage extends Component {

    state = {
        object: {}
    }

    async componentDidMount() {
        const { setPost } = this.props;
        setPost(null);
        await this.sendPostsData();
        await this.setState({ object: this.props.posts?.posts})
    }
    // componentDidUpdate(prevProps, prevState) {
    //     if(this.props.post.post !== null) {
    //         this.props.history.push('profile-page');
    //         const { post } = this.props.post;
    //         const { setSelectionPost } = this.props;
    //         db.ref().orderByKey().equalTo(`${post}`).on('value', snap => setSelectionPost(snap.val()) );
    //     }
    // }
    sendPostsData = async () => {
        const { setPosts } = this.props;
        await db.ref().on('value', snap => setPosts(snap.val()));
    }
    handleChange = (e) => {
        e.preventDefault();
        const { setPosts } = this.props;
        const obj = {};
        console.log('------>', Object.values(this.props.posts.posts));
        const text = e.target.value;
        if( text !== '' && this.props.posts ) {
            const arr = Object.keys(this.props.posts.posts);
            arr.forEach(key => {
                if( ( this.props.posts.posts[key].post.title.toUpperCase() ).indexOf(text.toUpperCase() ) > -1 ) {
                    obj[key] = this.props.posts.posts[key];
                }
            })
            this.setState({ object: obj})
        }else return this.setState({ object: this.props.posts.posts })
    }
    render() {

        const { object } = this.state;
        const { user } = this.props.user;
        return (
            <>
                {
                    user?.email === 'admin@gmail.com' ?
                        (
                            <>
                                <AdminAddForm />
                                <SearchCategories />
                                <input type='text' onChange={this.handleChange} placeholder='search title' />
                                <FormPost allPosts={object} />

                            </>
                        )
                        :
                        (
                            <>
                                <SearchCategories />
                                <input type='text' onChange={this.handleChange} placeholder='search title' />
                                <FormPost allPosts={object} />
                            </>
                        )
                }
            </>
        )
    }
}


const mapStateToProps = ({ posts, user, post }) => {
    return { posts, user, post }
}

const mapDispatchToProps = {
    setPosts,
    setPost,
    setSelectionPost
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);