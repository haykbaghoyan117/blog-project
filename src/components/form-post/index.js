import React, { Component } from 'react';
import Spinner from '../spinner';
import { setPost } from '../../store/actions';
import { connect } from "react-redux";

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
                    Object.entries(this.props.posts).map(
                        ([key, el]) => {
                            return (
                                <>
                                    <form onClick={this.onChangePost(key)}>
                                        <h1>{el.post.title}</h1>
                                        <img alt='alt' src={el.post.fileUrl} />
                                        <p>{el.post.description}</p>
                                    </form>
                                </>
                            )
                        }
                    )
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