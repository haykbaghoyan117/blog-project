// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import HomePage from '../home-page';
// import AdminAddForm from '../../components/admin-add-form';

// class AdminPage extends Component {

//     componentDidMount() {
//         console.log('admin page', this.props)
//         if(this.props.user.user && this.props.user.user.email !== 'admin@gmail.com') {
//             return this.props.history.push('/sign-in');
//         }
//     }

//     render() {
//         return (
//             <>
//                 <AdminAddForm />
//                 <HomePage />
//             </>
//         )
//     }
// }
// const mapStateToProps = ({ user }) => {
//     return ({ user })
// }

// const mapDispatchToProps = {
    
// }

// export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);