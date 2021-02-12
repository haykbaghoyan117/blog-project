import React, { Component } from 'react';
import './style.css'

export default class ScrollTop extends Component {
    state = {
        show: false
    }
    componentDidMount() {
        window.addEventListener("scroll", (e) => {
            if (window.pageYOffset > 100) {
                this.setState({ show: true })
            } else {
                this.setState({ show: false })
            }
        })
    }
    componentWillUnmount() {
        window.removeEventListener("scroll")
    }


    handleScroll = () => {
        window.scrollTo(0, 0)
    }
    render() {
        if (!this.state.show) {
            return null;
        }
        return (
            <div className="scroll-button" onClick={this.handleScroll}>
                <i className="fas fa-arrow-up"></i>
            </div>
        )
    }
}
