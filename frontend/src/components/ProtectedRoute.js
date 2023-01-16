import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default class ProtectedRoute extends Component {
  static contextType = Store;

  render() {
    const { state } = this.context;
    const { userInfo } = state;
    return userInfo ? this.props.children : <Navigate to="/signin" />;
  }
}
