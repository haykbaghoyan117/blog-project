import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminAddForm from '../../components/admin-add-form';

class AdminPage extends Component {
    componentDidMount() {
        if((this.props.user.user && this.props.user.user.email !== 'admin@gmail.com') || !this.props.user.user) {
            return this.props.history.push('/sign-in');
        }
    }
    render() {
        return (
            <AdminAddForm history={this.props.history} />
        )
    }
}
const mapStateToProps = ({ user }) => {
    return ({ user })
}
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);