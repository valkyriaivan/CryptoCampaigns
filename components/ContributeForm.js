import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: '' });

    var element = document.getElementById('submitButton');
    element.classList.add('disabled');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    element.classList.remove('disabled');
  };

  render() {
    return (
      <div class="col s12">
        <div class="card testClass bordes">
          <div class="card-content orange-text text-light-1">
            <span class="card-title">Contribute to this campaign:</span>
            <p class="textBox">Introduce the value in ETH</p>
            <form class="" onSubmit={this.onSubmit}>
              <div class="input-field col s12">
                <i class="fab fa-ethereum prefix" />
                <input
                  id="icon_prefix2"
                  class="materialize-textarea"
                  value={this.state.value}
                  onChange={event =>
                    this.setState({ value: event.target.value })
                  }
                />
              </div>
              <button
                class="btn right-align"
                type="submit"
                name="action"
                id="submitButton"
              >
                Submit
                <i class="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ContributeForm;
