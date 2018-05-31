import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRows() {
    return this.props.requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          approversCount={this.props.approversCount}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <div className="row paddingTop">
          <h2 className="title col s9">Requests</h2>
          <Link
            route={`/campaigns/${this.props.address}/requests/new`}
            className="col s2"
          >
            <a className="waves-effect waves-light btn m6 buttonsRed">
              <i className="material-icons left">fiber_new</i>Create new request
            </a>
          </Link>
          <div className="divider" />

          <table className="centered responsive-table">
            <thead className="orange-text text-light-1">
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Recipient</th>
                <th>Approval Count</th>
                <th>Approve</th>
                <th>Finalize</th>
              </tr>
            </thead>

            <tbody className="white-text">{this.renderRows()}</tbody>
          </table>
        </div>
      </Layout>
    );
  }
}

export default RequestIndex;
