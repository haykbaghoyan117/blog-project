import React, { Component } from 'react';
import Spinner from '../spinner';
import { Link } from "react-router-dom";
import { setPost, setSelectionPost } from '../../store/actions';
import { connect } from "react-redux";
import "./style.css";

class FormPost extends Component {
    render() {
        const { setSelectionPost } = this.props;
        return (
            this.props?.allPosts === null ?
                (
                    <Spinner />
                )
                :
                (
                    <div className='container mb-5 pb-5'>
                        <div className='row'>
                            {
                                
                                this.props.allPosts &&  Object.entries(this.props.allPosts).map(
                                    ([key, el]) => {
                                        return (
                                            <div onClick={() => {
                                                return this.props.history?.push(`/profile-page/${key}`)
                                            }} className='col-lg-4 col-sm-6 all-posts'>
                                                <div className="card-columns form-style">
                                                    <div className="card all-form">
                                                            <img className="card-img-top form-img" src={el.post.fileUrl} alt="Card image" />
                                                            <h4 className='form-title'>{el.post.title}</h4>
                                                            <p className="card-text">{el.post.description.substring(0, 25)}...</p>
                                                            <Link
                                                                className="btn btn-danger post-details"
                                                                to={`/profile-page/${key}`}
                                                            >
                                                                Post details
                                                            </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                )

                            }
                        </div>
                    </div>
                )
        )
    }
}


const mapStateToProps = ({ post, posts }) => {
    return { post, posts }
}

const mapDispatchToProps = {
    setSelectionPost
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPost);