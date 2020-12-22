import React, { Component } from 'react';

class ProfilePage extends Component {

    state = {
        inputList: [{id: 0}],
        obj: {},
        k: 0
    }

    addButton = () => {
        this.setState({inputList: [...this.state.inputList, { id: this.state.k+1, value: '' }]});
        this.setState({k: this.state.k+1})
    }

    sendButton = () => {
        console.log(this.state.obj)
    }

    handleChange = ( {target: {value, id}} ) => {
        this.setState({obj: {...this.state.obj, [id]: value}})
    }

    render() {
        return (
            <div>
                {
                    this.state.inputList.map((el) => {
                        return(
                            <div>
                                <label>Name:</label>
                                <input type='text' placeholder='text' id={`text${el.id}`} onChange={this.handleChange} />
                            </div>
                        )
                    })
                }
                <button onClick={this.addButton}>ADD</button>
                <button onClick={this.sendButton}>SEND</button>
            </div>
        )


    }
}
export default ProfilePage;