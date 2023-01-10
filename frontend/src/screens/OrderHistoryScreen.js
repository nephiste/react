import React, { useContext, useEffect, useReducer } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
//import Button from 'react-bootstrap/esm/Button';
import { Button, Table } from 'react-bootstrap';

class OrderHistoryScreen extends React.Component {
  static contextType = Store;

  state = {
    loading: true,
    error: '',
    orders: [],
  };

  componentDidMount() {
    const { userInfo } = this.context.state;
    this.fetchData(userInfo);
  }

  fetchData = async (userInfo) => {
    this.setState({ loading: true });
    try {
      const { data } = await axios.get(
        `/api/orders/mine`,

        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      this.setState({ loading: false, orders: data });
    } catch (error) {
      this.setState({ loading: false, error: getError(error) });
    }
  };

  render() {
    const { loading, error, orders } = this.state;
    return (
      <div>
        <Helmet>
          <title>Order History</title>
        </Helmet>

        <h1>Order History</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'No'}
                  </td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => {
                        window.location.href = `/order/${order._id}`;
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}

export default OrderHistoryScreen;
