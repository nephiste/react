import React from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

export default class AdminRoute extends React.Component {
  static contextType = Store;

  render() {
    const { state } = this.context;
    const { userInfo } = state;
    const { children } = this.props;
    return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
  }
}
