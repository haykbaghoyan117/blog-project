import React, { Component } from 'react';
import { db, storage } from "../../firebase";
import "./style.css";

class AdminAddForm extends Component {

    state = {
        title: '',
        description: '',
        file: null,
        fileUrl: null,
        id: '',
        categories: '',
        collapse: false
    }

    handleChange = ({ target: { value, id } }) => {
        this.setState({ [id]: value })
    }

    onFileChange = async (e) => {
        const file = await e.target.files[0];
        this.setState({ file });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { file } = this.state;
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        const fileUrl = await fileRef.getDownloadURL();
        await this.setState({ fileUrl });
        this.addData();
    }

    createCategories = ({ target: { value } }) => {
        this.setState({ categories: value })
    }

    addData = async () => {
        const postId = `${100000000000000 - Date.now()}`;
        const { title, description, fileUrl, categories } = this.state;
        await db.ref(`${postId}/` + 'post').set({
            'title': title,
            'fileUrl': fileUrl,
            'description': description,
            'categories': categories
        });
    }
    handleCollapse = () => {
        this.setState({ collapse: !this.state.collapse })
    }

    render() {
        return (
            <div className='admin-add-form'>

                {
                    this.state.collapse && (
                        <>
                            <h1 className='admin-title'>Add new post</h1>
                            <form className='admin-form' action="" onSubmit={this.handleSubmit} >
                                <div className="form-group">
                                    <input
                                        required
                                        type="text"
                                        className="form-control admin-input"
                                        value={this.state.title}
                                        placeholder="Your post title"
                                        id="title"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        required
                                        type="file"
                                        className="form-control admin-input-file"
                                        onChange={this.onFileChange}
                                        placeholder="img url"
                                        id="img"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        required
                                        type="text"
                                        className="form-control admin-input"
                                        value={this.state.description}
                                        placeholder="description"
                                        id="description"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className='admin-button'>
                                    <div className="dropdown">
                                        <input
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            id="dropdownMenu2"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            value={`Categories: ${this.state.categories}`}
                                        />
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <input className="dropdown-item" type="button" value='Animals' onClick={this.createCategories} />
                                            <input className="dropdown-item" type="button" value='Nature' onClick={this.createCategories} />
                                            <input className="dropdown-item" type="button" value='News' onClick={this.createCategories} />
                                            <input className="dropdown-item" type="button" value='Sport' onClick={this.createCategories} />
                                            <input className="dropdown-item" type="button" value='Cars' onClick={this.createCategories} />
                                            <input className="dropdown-item" type="button" value='Happy' onClick={this.createCategories} />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-secondary admin-right-button">Add post</button>
                                </div>
                            </form>
                        </>
                    )
                }
                <button className="collapse-button" onClick={this.handleCollapse}> {this.state.collapse ? <i class="fas fa-chevron-up"></i>: <i>"Add new post"</i>}</button>

            </div>
        )
    }
}

export default AdminAddForm;