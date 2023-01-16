import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { Store } from '../Store';
import React from 'react';

class Product extends React.Component {
  static contextType = Store;

  addToCartHandler = async (item) => {
    const { state, dispatch: ctxDispatch } = this.context;
    const {
      cart: { cartItems },
    } = state;
    const existItem = cartItems.find((x) => x._id === item._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  render() {
    const { product } = this.props;
    return (
      <Card className="card">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            className="card-img-top"
            alt={product.name}
          />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.slug}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={product.rating} numReviews={product.numReviews} />
          <Card.Text>${product.price}</Card.Text>
          {product.countInStock === 0 ? (
            <Button variant="light" disabled className="disabl">
              Out of stock
            </Button>
          ) : (
            <Button onClick={() => this.addToCartHandler(product)}>
              Add to cart
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  }
}

export default Product;
