import Spinner from 'react-bootstrap/Spinner';
import React from 'react';

export default class LoadingBox extends React.Component {
  render() {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
}
