import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../components/CheckoutSteps';

export default class ShippingAddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      cart: {
        shippingAddress: {
          fullName: '',
          address: '',
          city: '',
          postalCode: '',
          country: '',
        },
      },
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount() {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.setState({ userInfo });
    } else {
      userInfo = null;
    }
    const shippingAddress = localStorage.getItem('shippingAddress');
    if (shippingAddress) {
      this.setState((prevState) => {
        return {
          ...prevState,
          cart: {
            ...prevState.cart,
            shippingAddress: JSON.parse(shippingAddress),
          },
        };
      });
    }
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { fullName, address, city, postalCode, country } =
      this.state.cart.shippingAddress;
    this.setState({
      shippingAddress: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    window.location.href = '/payment';
  };

  render() {
    const { fullName, address, city, postalCode, country } =
      this.state.cart.shippingAddress;
    return (
      <div>
        <Helmet>
          <title>Shipping Address</title>
        </Helmet>

        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="container small-container">
          <h1 className="my-3">Shipping Address</h1>
          <Form onSubmit={this.submitHandler}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) =>
                  this.setState((prevState) => {
                    return {
                      ...prevState,
                      cart: {
                        ...prevState.cart,
                        shippingAddress: {
                          ...prevState.cart.shippingAddress,
                          fullName: e.target.value,
                        },
                      },
                    };
                  })
                }
                placeholder="Full Name"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address</Form.Label>
              {/* <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              /> */}
              <Form.Control
                type="text"
                value={address}
                onChange={(e) =>
                  this.setState((prevState) => {
                    return {
                      ...prevState,
                      cart: {
                        ...prevState.cart,
                        shippingAddress: {
                          ...prevState.cart.shippingAddress,
                          address: e.target.value,
                        },
                      },
                    };
                  })
                }
                placeholder="Address"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Control
                type="text"
                value={city}
                onChange={(e) =>
                  this.setState((prevState) => {
                    return {
                      ...prevState,
                      cart: {
                        ...prevState.cart,
                        shippingAddress: {
                          ...prevState.cart.shippingAddress,
                          city: e.target.value,
                        },
                      },
                    };
                  })
                }
                placeholder="city"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Control
                type="text"
                value={postalCode}
                onChange={(e) =>
                  this.setState((prevState) => {
                    return {
                      ...prevState,
                      cart: {
                        ...prevState.cart,
                        shippingAddress: {
                          ...prevState.cart.shippingAddress,
                          postalCode: e.target.value,
                        },
                      },
                    };
                  })
                }
                placeholder="Postal Code"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
              <Form.Control
                type="text"
                value={country}
                onChange={(e) =>
                  this.setState((prevState) => {
                    return {
                      ...prevState,
                      cart: {
                        ...prevState.cart,
                        shippingAddress: {
                          ...prevState.cart.shippingAddress,
                          country: e.target.value,
                        },
                      },
                    };
                  })
                }
                placeholder="Full Name"
                required
              />
            </Form.Group>{' '}
            <div className="mb-3">
              <Button variant="primary" type="submit">
                Continue
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
