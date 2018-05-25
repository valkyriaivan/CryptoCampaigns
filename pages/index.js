import React, { Component } from 'react';
import factory from '../ethereum/factory';
import Campaign from '../ethereum/campaign';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';
import CampaignBox from '../components/CampaignBox';

class CampaignIndex extends Component {
  state = {
    foto: '',
    titulo: '',
    desc: ''
  };

  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      // console.log({ address });
      // this.getCampaignState({ address });

      return <CampaignBox direc={address} key={address} />;
    });

    return <div>{items}</div>;
  }

  render() {
    return (
      <Layout>
        <div className="row paddingTop">
          <h2 class="title col s9">Open Campaigns</h2>
          <Link route="/campaigns/new" className="col s2">
            <a className=" btn m6 buttonsRed">
              <i className="material-icons left">fiber_new</i>Create new
              campaign
            </a>
          </Link>
          <div class="divider" />
        </div>
        <div className="row">{this.renderCampaigns()}</div>
      </Layout>
    );
  }
}

export default CampaignIndex;
