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
                    <div className='container-fluid'>
                        <div className='row'>
                            {
                                
                                this.props.allPosts &&  Object.entries(this.props.allPosts).map(
                                    ([key, el]) => {
                                        return (
                                            <div className='col-md-4 all-posts'>
                                                <div className="card-columns form-style">
                                                    <div className="card all-form">
                                                        <div>
                                                            <h4>{el.post.title}</h4>
                                                        </div>
                                                        <div className='super-ramka'>
                                                            <div className="lent" />
                                                            <img className="card-img-top form-img" src={el.post.fileUrl} alt="Card image" />
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text">{el.post.description}</p>
                                                            <Link
                                                                className="btn btn-secondary post-details"
                                                                to={`/profile-page/${key}`}
                                                            >
                                                                Post details
                                                            </Link>
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