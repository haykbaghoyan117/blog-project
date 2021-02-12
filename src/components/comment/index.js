import React, { Component } from 'react';
import './style.css';

export default class Comment extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <div className='row p-2'>
                    <div className='col-3 comment-section d-flex flex-column text-success align-items-center'>
                        <span className='user-icon'><i className="far fa-user text-center"></i></span>
                        <h4><strong>{ this.props.userDisplayName }</strong></h4>
                    </div>
                    <div className='col-9 text-justify text-light comment-text'>
                        <p><em>{ this.props.commentText }</em></p>
                    </div>
                </div>
            </div>
        )
    }
}
