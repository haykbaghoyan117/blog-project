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
                    <div className='container'>
                        <div className='row'>
                            {

                                this.props.allPosts && Object.entries(this.props.allPosts).map(
                                    ([key, el]) => {
                                        const d = new Date(100000000000000 - key)
                                        const date = `${d.toLocaleString("en-US", { month: "short" })} ${d.toLocaleString("en-US", { day: "numeric" })}th ${d.toLocaleString("en-US", { year: "numeric" })}`
                                        return (
                                            <div onClick={() => {
                                                return this.props.history?.push(`/profile-page/${key}`)
                                            }} className='col-lg-4 col-md-6 col-12 all-posts'>
                                                    <div className="d-flex flex-column form-style">
                                                        <img className="form-img" src={el.post.fileUrl} alt="Card image" />
                                                        <div className="all-form p-4">
                                                            <div className=''>
                                                                <h4 className='form-title'><strong>{el.post.title.substring(0, 10)}...</strong></h4>
                                                                <p className="text-justify">{el.post.description.substring(0, 100)}...</p>
                                                            </div>
                                                            <div className='d-flex justify-content-between'>
                                                                <button className='btn btn-danger'>Category: {el.post.categories === '' ? 'not choose' : el.post.categories}</button>
                                                                <div>{date}</div>
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