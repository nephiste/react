import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import React from 'react';

class HomeScreen extends React.Component {
  state = {
    loading: true,
    error: '',
    products: [],
  };

  componentDidMount() {
    const fetchData = async () => {
      this.setState({ loading: true });
      try {
        const result = await axios.get('/api/products');
        this.setState({ loading: false, products: result.data });
      } catch (err) {
        this.setState({ loading: false, error: err.message });
      }
    };
    fetchData();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Herbaciarnia</title>
        </Helmet>
        <h1>Featured Products</h1>
        <div className="products">
          {this.state.loading ? (
            <LoadingBox />
          ) : this.state.error ? (
            <MessageBox variant="danger">{this.state.error}</MessageBox>
          ) : (
            <Row>
              {this.state.products.map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    );
  }
}

export default HomeScreen;
