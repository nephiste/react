import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export default class PaymentMethodScreen extends React.Component {
  static contextType = Store;

  state = {
    paymentMethod: this.context.state.cart.paymentMethod || 'PayPal',
  };

  componentDidMount() {
    if (!this.context.state.cart.shippingAddress.address) {
      window.location.href = '/shipping';
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.context.dispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: this.state.paymentMethod,
    });
    localStorage.setItem('paymentMethod', this.state.paymentMethod);
    window.location.href = '/placeorder';
  };

  handleChange = (e) => {
    this.setState({ paymentMethod: e.target.value });
  };

  render() {
    return (
      <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="container small-container">
          <Helmet>
            <title>Payment Method</title>
          </Helmet>
          <h1 className="my-3">Payment Method</h1>
          <Form onSubmit={this.submitHandler}>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={this.state.paymentMethod === 'PayPal'}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <Form.Check
                type="radio"
                id="Card"
                label="Credit Card"
                value="Card"
                checked={this.state.paymentMethod === 'Card'}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-3">
              <Button type="submit">Continue</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
