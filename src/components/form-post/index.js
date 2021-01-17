import React, { Component } from 'react';
import Spinner from '../spinner';
import { Link } from "react-router-dom";
import { setPost } from '../../store/actions';
import { connect } from "react-redux";
import "./style.css";

class FormPost extends Component {

    onChangePost = (id) => () => {
        const { setPost } = this.props;
        setPost(id);
    }

    render() {
        return (
            this.props.posts === null ?
                (
                    <Spinner />
                )
                :
                (
                    <div className='container-fluid'>
                        <div className='row'>
                            {
                                Object.entries(this.props.posts).map(
                                    ([key, el]) => {
                                        return (
                                            <div className='col-md-4 all-posts'>
                                                <div className="card-columns form-style">
                                                    <div className="card all-form">
                                                        <h2>{el.post.title}</h2>
                                                        <div className='super-ramka'>
                                                            <div className="lent"/>
                                                            <img className="card-img-top form-img" src={el.post.fileUrl} alt="Card image" />
                                                        </div>
                                                        <div className="card-body">
                                                            <p className="card-text">{el.post.description}</p>
                                                            <Link className="btn btn-secondary post-details" to={`/profile-page/${key}`} >Post details</Link>
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


const mapStateToProps = ({ post }) => {
    return { post }
}

const mapDispatchToProps = {
    setPost
}

export default connect(mapStateToProps, mapDispatchToProps)(FormPost);