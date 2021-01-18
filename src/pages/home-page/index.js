import React, { Component } from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';
import { setPosts, setPost, setSelectionPost } from '../../store/actions';
import FormPost from '../../components/form-post';
import SearchCategories from '../../components/search-categories';
import AdminAddForm from '../../components/admin-add-form';

class HomePage extends Component {

    componentDidMount() {
        this.props.setPost(null);
        this.sendPostsData();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.post.post !== null) {
            this.props.history.push('profile-page');
            const { post } = this.props.post;
            const { selectionPost } = this.props;
            db.ref().orderByKey().equalTo(`${post}`).on('value', snap => this.setState(setSelectionPost(snap.val())));
        }
    }
    

    sendPostsData = async () => {
        const { setPosts } = this.props;
        await db.ref().on('value', snap => setPosts(snap.val()));
    }

    render() {

        const { posts } = this.props.posts;
        const { user } = this.props.user;
        return (
            <>
                {
                    user?.email === 'admin@gmail.com' ?
                        (
                            <>
                                <AdminAddForm />
                                <SearchCategories />
                                <FormPost posts={posts} />

                            </>
                        )
                        :
                        (
                            <>
                                <SearchCategories />
                                <FormPost posts={posts} />
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