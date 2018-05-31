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
          <h2 className="title">Create a Campaign</h2>
          <div className="divider" />

          <form className="col s12 whiteText" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col s4">
                Title:
                <div className="input-field">
                  <i className="fas fa-bullhorn prefix" />
                  <input
                    id="titulo"
                    className="materialize-textarea"
                    value={this.state.titulo}
                    onChange={event =>
                      this.setState({ titulo: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col s4">
                Foto:
                <div className="input-field">
                  <i className="material-icons prefix">camera_alt</i>
                  <input
                    id="foto"
                    className="materialize-textarea"
                    value={this.state.foto}
                    onChange={event =>
                      this.setState({ foto: event.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col s4">
                Minimum contribution(wei):
                <div className="input-field">
                  <i className="fas fa-thermometer-empty prefix" />
                  <input
                    id="minimumContribution"
                    className="materialize-textarea"
                    value={this.state.minimumContribution}
                    onChange={event =>
                      this.setState({
                        minimumContribution: event.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="col s12">
                Description:
                <div className="input-field">
                  <i className="far fa-comment-alt prefix" />

                  <textarea
                    id="desc"
                    className="materialize-textarea"
                    value={this.state.desc}
                    onChange={event =>
                      this.setState({ desc: event.target.value })
                    }
                  />
                </div>
              </div>

              <button
                className="btn waves-effect waves-light right-align"
                type="submit"
                name="action"
                id="submitButton"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          </form>
        </div>
      </Layout>
    );
  }
}

export default CampaignNew;
