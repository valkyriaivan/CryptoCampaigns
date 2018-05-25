import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    formMessage: '',
    foto: '',
    titulo: '',
    desc: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();
    console.log(this.state.titulo);

    this.setState({ loading: true, formMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(
          this.state.minimumContribution,
          this.state.titulo,
          this.state.desc,
          this.state.foto
        )
        .send({
          from: accounts[0]
        });
      Router.pushRoute('/');
    } catch (err) {
      this.setState({ formMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <div className="row paddingTop">
          <h2 class="title">Create a Campaign</h2>
          <div class="divider" />

          <form class="col s12 whiteText" onSubmit={this.onSubmit}>
            <div class="row">
              <div class="col s4">
                Title:
                <div class="input-field">
                  <i class="fas fa-bullhorn prefix" />
                  <input
                    id="titulo"
                    class="materialize-textarea"
                    value={this.state.titulo}
                    onChange={event =>
                      this.setState({ titulo: event.target.value })
                    }
                  />
                </div>
              </div>
              <div class="col s4">
                Foto:
                <div class="input-field">
                  <i class="material-icons prefix">camera_alt</i>
                  <input
                    id="foto"
                    class="materialize-textarea"
                    value={this.state.foto}
                    onChange={event =>
                      this.setState({ foto: event.target.value })
                    }
                  />
                </div>
              </div>
              <div class="col s4">
                Minimum contribution(wei):
                <div class="input-field">
                  <i class="fas fa-thermometer-empty prefix" />
                  <input
                    id="minimumContribution"
                    class="materialize-textarea"
                    value={this.state.minimumContribution}
                    onChange={event =>
                      this.setState({
                        minimumContribution: event.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div class="col s12">
                Description:
                <div class="input-field">
                  <i class="far fa-comment-alt prefix" />

                  <textarea
                    id="desc"
                    class="materialize-textarea"
                    value={this.state.desc}
                    onChange={event =>
                      this.setState({ desc: event.target.value })
                    }
                  />
                </div>
              </div>

              <button
                class="btn waves-effect waves-light right-align"
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

export default CampaignNew;
