import Alert from 'react-bootstrap/Alert';
import React from 'react';

export default class MessageBox extends React.Component {
  render() {
    const { variant, children } = this.props;
    return <Alert variant={variant || 'info'}>{children}</Alert>;
  }
}
