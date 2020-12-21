import React, { Component } from 'react';
import { db } from "../../firebase";

class AdminPage extends Component {

    state = {
        title: '',
        description: '',
        name: ''
    }

    handleChange = ({ target: { value, id } }) => {
        this.setState({ [id]: value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.readData();
        this.sendData()
    }

    readData = () => {
        const dbRefObject = db.ref().child('posts').child('comments');
        dbRefObject.on('value', snap => console.log('xxxxxxx', snap.val()));
    }

    sendData = () => {
        // const { key, value } = this.state;
        const dbRefObject = db.ref().child('posts').child('comments').child('uid');
        dbRefObject.on('child_added', snap => console.log('yyyyyyyy', snap.val()));
        // dbRefObject.push('hayk');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.state)
    }



    render() {
        return (
            <React.Fragment>
                <form action="" onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Your post title" id="title" onChange={this.handleChange} />
                    </div>
                    {/* <div className="form-group">
                        <input type="file" className="form-control" placeholder="img url" id="img" />
                    </div> */}
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="description" id="description" onChange={this.handleChange} />
                    </div>
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
            </React.Fragment>
        )
    }
}
export default AdminPage;