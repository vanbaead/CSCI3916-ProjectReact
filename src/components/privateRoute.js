import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ loggedIn, element }) => {
    if (!loggedIn) {
        return <Navigate to="/login" />;
    }
    return element;
};

const mapStateToProps = (state) => ({
    loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
