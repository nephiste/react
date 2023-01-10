import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import { toast } from 'react-toastify';

class OrderListScreen extends React.Component {
  static contextType = Store;
  state = {
    loading: true,
    error: '',
    loadingDelete: false,
    successDelete: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.successDelete) {
      this.setState({
        successDelete: false,
      });
    }
  }

  fetchData = async () => {
    try {
      this.setState({ loading: true });
      const { data } = await axios.get(`/api/orders`, {
        headers: {
          Authorization: `Bearer ${this.context.state.userInfo.token}`,
        },
      });
      this.setState({ orders: data, loading: false });
    } catch (err) {
      this.setState({
        error: getError(err),
        loading: false,
      });
    }
  };

  deleteHandler = async (order) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        this.setState({ loadingDelete: true });
        await axios.delete(`/api/orders/${order._id}`, {
          headers: {
            Authorization: `Bearer ${this.context.state.userInfo.token}`,
          },
        });
        toast.success('order deleted successfully');
        window.location.reload(false);
        this.setState({
          loadingDelete: false,
          successDelete: true,
        });
      } catch (err) {
        toast.error(getError(this.error));
        this.setState({
          loadingDelete: false,
        });
      }
    }
  };

  render() {
    const { state } = this.context;
    const { userInfo } = state;
    const { loading, error, orders, loadingDelete } = this.state;

    return (
      <div>
        <Helmet>
          <title>Orders</title>
          {loadingDelete && <LoadingBox></LoadingBox>}
        </Helmet>
        <h1>Orders</h1>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
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
                  <td>{order.user ? order.user.name : 'DELETED USER'}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : 'No'}
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        window.location.href = `/order/${order._id}`;
                      }}
                    >
                      Details
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => this.deleteHandler(order)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default OrderListScreen;
