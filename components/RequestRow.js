import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class Requesttr extends Component {
  onApprove = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  onFinalize = async () => {
    const campaign = Campaign(this.props.address);

    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  };

  render() {
    const { id, request, approversCount } = this.props;
    const readyToFinalize = request.approvalCount > approversCount / 2;
    let finalizedRow = 'tableHighlight';
    if (request.complete) {
      finalizedRow = 'grey-text text-darken-1';
    } else if (readyToFinalize && !request.complete) {
      finalizedRow = 'tableHighlight green-text';
    }
    // const alreadyApproved = ;
    return (
      <tr className={finalizedRow}>
        <td>{id}</td>
        <td>{request.description}</td>
        <td>{web3.utils.fromWei(request.value, 'ether')}</td>
        <td>{request.recipient}</td>
        <td>
          {request.approvalCount}/{approversCount}
        </td>
        <td>
          {request.complete ||
          request.approvalCount == approversCount ? null : (
            <a
              className="btn-floating btn-small green"
              onClick={this.onApprove}
            >
              <i className="material-icons">thumb_up</i>
            </a>
          )}
        </td>
        <td>
          {request.complete ? null : (
            <a className="btn-floating btn-small red" onClick={this.onFinalize}>
              <i className="material-icons">close</i>
            </a>
          )}
        </td>
      </tr>
    );
  }
}

export default Requesttr;
