import React, { Component } from 'react';
import { db } from '../../firebase';
import { connect } from 'react-redux';
import { setPosts, setPost, setSelectionPost } from '../../store/actions';
import FormPost from '../../components/form-post';
import SearchCategories from '../../components/search-categories';
import AdminAddForm from '../../components/admin-add-form';
import './style.css';
import SearchBar from '../../components/search-bar';

class HomePage extends Component {

    state = {
        text: '',
        scrollButton: 'block'
    }

    async componentDidMount() {
        const { setPost } = this.props;
        setPost(null);
        await this.sendPostsData();
        await this.setState({ object: this.props.posts?.posts})
    }
    componentDidUpdate(prevProps, prevState) {
        if(this.props.post.post !== null) {
            this.props.history.push('profile-page');
            const { post } = this.props.post;
            const { setSelectionPost } = this.props;
            db.ref().orderByKey().equalTo(`${post}`).on('value', snap => setSelectionPost(snap.val()) );
        }
    }
    sendPostsData = async () => {
        const { setPosts } = this.props;
        await db.ref().on('value', snap => setPosts(snap.val()));
    }
    handleChange = (e) => {
        e.preventDefault();
        this.setState({ text: e.target.value });
    }
    filterObjects = () => {
        const obj = {};
        const { text } = this.state;
        if( text !== '' && this.props.posts.posts ) {
            const arr = Object.keys(this.props.posts.posts);
            arr.forEach(key => {
                if( ( this.props.posts.posts[key].post.title.toUpperCase() ).indexOf(text.toUpperCase() ) > -1 ) {
                    obj[key] = this.props.posts.posts[key];
                }
            })
            return obj;
        }else return this.props.posts.posts;
    }
    render() {
        const { scrollButton } = this.state;
        return (
            <div className='pb-5'>
                <div className='container home-search'>
                    <div className='blog-left'>
                        <h3>Blog</h3>
                        <SearchCategories />
                    </div>
                    <div className='blog-right'>
                        <div className='ggg'>
                            <label><input className='fff' type="text" id="search-bar" onChange={this.handleChange} /><span className="search-icon"><i class="fas fa-search"></i></span></label>
                        </div>
                    </div>
                </div>
                <input
                    type='button'
                    className='scroll-button'
                    value='^'
                    onClick={() => { window.scrollTo(0, 0) }}
                    style={{position:"fixed", display:`${ scrollButton }`}}
                />
                <FormPost allPosts={this.filterObjects()} history={this.props.history} />
                <div className='m-5'>
                    <ul class="pagination justify-content-center">
                        <li class="page-item"><button className='btn btn-light pag-section m-1'><strong>1</strong></button></li>
                        <li class="page-item"><button className='btn btn-light pag-section m-1'><strong>2</strong></button></li>
                        <li class="page-item"><button className='btn btn-light pag-section m-1'><strong>3</strong></button></li>
                        <li class="page-item"><button className='btn btn-light pag-section m-1'><strong>4</strong></button></li>
                    </ul>
                </div>
            </div>
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