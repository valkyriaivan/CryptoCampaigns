import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    errorMessage: '',
    loading: false,
    buttonState: ''
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
      <div className="col s12">
        <div className="card testClass bordes">
          <div className="card-content orange-text text-light-1">
            <span className="card-title">Contribute to this campaign:</span>
            <p className="textBox">Introduce the value in ETH</p>
            <form className="" onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <i className="fab fa-ethereum prefix" />
                <input
                  id="icon_prefix2"
                  className="materialize-textarea"
                  value={this.state.value}
                  onChange={event =>
                    this.setState({ value: event.target.value })
                  }
                />
              </div>
            </form>
            <button
              className="btn right-align"
              type="submit"
              name="action"
              id="submitButton"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ContributeForm;
