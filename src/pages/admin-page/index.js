import React, { Component } from 'react';
import { db, storage } from "../../firebase";
import { connect } from 'react-redux';
import HomePage from '../home-page';

class AdminPage extends Component {

    state = {
        title: '',
        description: '',
        file: null,
        fileUrl: null
    } 

    handleChange = ({ target: { value, id } }) => {
        this.setState({ [id]: value })
    }

    onFileChange = async (e) => {
        const file = e.target.files[0];
        this.setState({ file });
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();
        const { file } = this.state;
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file.name);
        const fileUrl = await fileRef.getDownloadURL();
        await this.setState({ fileUrl });
        this.addData();
    }

    addData = async () => {
        const postId = `post${Math.floor(Math.random() * 1000000)}`;
        const { title, description, fileUrl } = this.state;
        await db.ref().child(postId).push({'title': title});
        await db.ref().child(postId).push({'description': description});
        await db.ref().child(postId).push({'fileUrl': fileUrl})
    }

    render() {
        return (
            <React.Fragment>
                <h1>ADMIN PAGE</h1>
                <form action="" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.title} placeholder="Your post title" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <input type="file" className="form-control" onChange={this.onFileChange} placeholder="img url" id="img" />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" value={this.state.description} placeholder="description" id="description" onChange={this.handleChange} />
                    </div>
                    {/* <img alt='jjj' src={this.state.fileUrl} /> */}
                    {/* <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Post categoria
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <button className="dropdown-item" type="button">Action</button>
                            <button className="dropdown-item" type="button">Another action</button>
                            <button className="dropdown-item" type="button">Something else here</button>
                        </div>
                    </div> */}
                    <button type="submit" className="btn btn-primary">Add post</button>
                </form>
                <HomePage />
            </React.Fragment>
        )
    }
}
const mapStateToProps = ({ posts }) => {
    return ({ posts })
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);