import React from 'react';
import Chart from 'react-google-charts';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class DashboardScreen extends React.Component {
  state = {
    loading: true,
    error: '',
    summary: {},
  };
  static contextType = Store;

  userInfo = this.context.state.userInfo;

  componentDidMount() {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/orders/summary', {
          headers: { Authorization: `Bearer ${this.userInfo.token}` },
        });
        this.setState({ loading: false, summary: data });
      } catch (err) {
        this.setState({ loading: false, error: getError(err) });
      }
    };
    fetchData();
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        {this.state.loading ? (
          <LoadingBox />
        ) : this.state.error ? (
          <MessageBox variant="danger">{this.state.error}</MessageBox>
        ) : (
          <>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {this.state.summary.users && this.state.summary.users[0]
                        ? this.state.summary.users[0].numUsers
                        : 0}
                    </Card.Title>
                    <Card.Text> Users</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {this.state.summary.orders && this.state.summary.users[0]
                        ? this.state.summary.orders[0].numOrders
                        : 0}
                    </Card.Title>
                    <Card.Text> Orders</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      €
                      {this.state.summary.orders && this.state.summary.users[0]
                        ? this.state.summary.orders[0].totalSales.toFixed(2)
                        : 0}
                    </Card.Title>
                    <Card.Text> Orders</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="my-3">
              <h2>Sales</h2>
              {this.state.summary.dailyOrders.length === 0 ? (
                <MessageBox>No Sale</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...this.state.summary.dailyOrders.map((x) => [
                      x._id,
                      x.sales,
                    ]),
                  ]}
                ></Chart>
              )}
            </div>
            <div className="my-3">
              <h2>Categories</h2>
              {this.state.summary.productCategories.length === 0 ? (
                <MessageBox>No Category</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="PieChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ['Category', 'Products'],
                    ...this.state.summary.productCategories.map((x) => [
                      x._id,
                      x.count,
                    ]),
                  ]}
                ></Chart>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default DashboardScreen;
