import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
  state = {
    value: '',
    description: '',
    recipient: '',
    loading: false,
    errorMessage: ''
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    this.setState({ loading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <div className="row paddingTop">
          <h2 class="title">Create a request</h2>
          <div class="divider" />

          <form class="col s12 whiteText" onSubmit={this.onSubmit}>
            <div class="row">
              <div class="col s6">
                Description
                <div class="input-field">
                  <i class="fas fa-bullhorn prefix" />
                  <input
                    id="titulo"
                    class="materialize-textarea"
                    value={this.state.description}
                    onChange={event =>
                      this.setState({ description: event.target.value })
                    }
                  />
                </div>
              </div>
              <div class="col s4">
                Recipient
                <div class="input-field">
                  <i class="fas fa-user-plus prefix" />
                  <input
                    id="minimumContribution"
                    class="materialize-textarea"
                    value={this.state.recipient}
                    onChange={event =>
                      this.setState({ recipient: event.target.value })
                    }
                  />
                </div>
              </div>
              <div class="col s2">
                Value in Ether:
                <div class="input-field">
                  <i class="fab fa-ethereum prefix" />
                  <input
                    id="foto"
                    class="materialize-textarea"
                    value={this.state.value}
                    onChange={event =>
                      this.setState({ value: event.target.value })
                    }
                  />
                </div>
              </div>
              <button
                class="btn right-align col s2 push-s10 toped"
                type="submit"
                name="action"
                id="submitButton"
              >
                Submit
                <i class="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

export default RequestNew;
