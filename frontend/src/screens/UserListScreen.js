import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

export default class UserListScreen extends React.Component {
  state = {
    loading: true,
    error: '',
  };

  static contextType = Store;
  userInfo = this.context.state.userInfo;

  componentDidMount() {
    const { userInfo } = this.context.state;
    this.fetchData(userInfo);
  }

  componentDidUpdate(prevProps, prevState) {
    const { successDelete } = this.state;
    if (prevState.successDelete !== successDelete) {
      this.setState({
        loadingDelete: false,
        successDelete: false,
      });
    }
  }

  fetchData = async (userInfo) => {
    try {
      this.setState({ loading: true });
      const { data } = await axios.get(`/api/users`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      this.setState({
        users: data,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        error: getError(err),
      });
    }
  };

  deleteHandler = async (user) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        this.setState({ loadingDelete: true });
        await axios.delete(`/api/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${this.context.state.userInfo.token}`,
          },
        });
        toast.success('user deleted successfully');
        window.location.reload(false);
        this.setState({
          loadingDelete: false,
          successDelete: true,
        });
      } catch (error) {
        toast.error(getError(error));
        this.setState({
          loadingDelete: false,
        });
      }
    }
  };

  render() {
    const { loading, error, users, loadingDelete } = this.state;

    return (
      <div>
        <Helmet>
          <title>Users</title>
        </Helmet>
        <h1>Users</h1>

        {loadingDelete && <LoadingBox></LoadingBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => this.deleteHandler(user)}
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
