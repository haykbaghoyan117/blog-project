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
                    <div className='container mb-5'>
                        <div className='row'>
                            {

                                this.props.allPosts && Object.entries(this.props.allPosts).map(
                                    ([key, el]) => {
                                        const d = new Date(100000000000000 - key)
                                        const date = `${d.toLocaleString("en-US", { month: "short" })} ${d.toLocaleString("en-US", { day: "numeric" })}th ${d.toLocaleString("en-US", { year: "numeric" })}`
                                        return (
                                            <div onClick={() => {
                                                return this.props.history?.push(`/profile-page/${key}`)
                                            }} className='col-lg-4 col-sm-6 all-posts'>
                                                <div className="card-columns form-style">
                                                    <div className="card">
                                                    <img className="card-img-top form-img" src={el.post.fileUrl} alt="Card image" />

                                                        <div className="all-form">
                                                            <div className='m-4'>
                                                                <h4 className='form-title'><strong>{el.post.title}</strong></h4>
                                                                <p className="card-text">{el.post.description.substring(0, 25)}...</p>
                                                            </div>
                                                            <div className='d-flex align-items-end justify-content-between ml-4 mr-4 jjj'>
                                                                <div>Category: {el.post.categories === '' ? 'not choose' : el.post.categories}</div>
                                                                <div>{date}</div>
                                                            </div>
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