import React, { Component } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();
    // console.log(summary);
    const titulo = await campaign.methods.title().call();
    const desc = await campaign.methods.desc().call();
    const foto = await campaign.methods.foto().call();
    console.log(titulo);

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestCount: summary[2],
      appoversCount: summary[3],
      manager: summary[4],
      titulo: titulo,
      desc: desc,
      foto: foto
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestCount,
      appoversCount
    } = this.props;
    const items = (
      <div>
        <div className="col s12 m6">
          <div className="card testClass bordes">
            <div className="card-content blue-grey-text text-lighten-3">
              <span className="card-title ">Minimum Contribution (wei)</span>
              <p className="textBox">
                You must contribute at least this much wei to become an approver
              </p>
            </div>
            <div className="card-action">
              <p className="orange-text text-light-1 dataCards">
                {minimumContribution} wei
              </p>
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <div className="card testClass bordes">
            <div className="card-content blue-grey-text text-lighten-3">
              <span className="card-title">Campaign Balance (ether)</span>
              <p className="textBox">
                The balance is how much money this campaign has left to spend
              </p>
            </div>
            <div className="card-action">
              <p className="orange-text text-light-1 dataCards">
                {web3.utils.fromWei(balance, 'ether')} ETH
              </p>
            </div>
          </div>
        </div>

        <div className="col s12 m6">
          <div className="card testClass bordes">
            <div className="card-content blue-grey-text text-lighten-3">
              <span className="card-title">Number of Approvers</span>
              <p className="textBox">
                Number of people who have already donated to the Campaign
              </p>
            </div>
            <div className="card-action">
              <p className="orange-text text-light-1 dataCards">
                {appoversCount}
              </p>
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <div className="card testClass bordes">
            <div className="card-content blue-grey-text text-lighten-3">
              <span className="card-title">Number of Requests </span>
              <p className="textBox">
                A request to withdraw money from the contract. Request must be
                approved by approvers
              </p>
            </div>
            <div className="card-action">
              <p className="orange-text text-light-1 dataCards">
                {requestCount}
              </p>
            </div>
          </div>
        </div>
      </div>
    );

    return <div>{items}</div>;
  }

  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col s12 m12 toped">
            <div className="card horizontal bordes">
              <div className="card-image">
                <img className="responsive-img" src={this.props.foto} />
              </div>
              <div className="card-stacked testClass">
                <div className="card-content">
                  <h2
                    className="testGreen truncate"
                    style={{ fontSize: '40px' }}
                  >
                    {this.props.titulo}
                  </h2>
                  <p className="white-text" style={{ fontSize: '15px' }}>
                    {this.props.desc}
                  </p>
                </div>
                <div className="card-action orange-text text-light-1">
                  Manager: {this.props.manager}
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m12">
            <div className="divider" />
          </div>
          <div className="col s8">{this.renderCards()}</div>
          <div className="col s4">
            <ContributeForm address={this.props.address} />
            <Link route={`/campaigns/${this.props.address}/requests`}>
              <a
                className="waves-effect waves-light btn m6 buttonsRed"
                style={{ margin: '10px' }}
              >
                <i className="material-icons left">pageview</i>View requests
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default CampaignShow;
