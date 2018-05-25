import React, { Component } from 'react';
import { Link } from '../routes';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import TextTruncate from 'react-text-truncate';

class CampaignBox extends Component {
  state = {
    foto: '',
    titulo: '',
    desc: ''
  };

  async componentDidMount() {
    const campaign = Campaign(this.props.direc);
    const foto = await campaign.methods.foto().call();
    const titulo = await campaign.methods.title().call();
    const desc = await campaign.methods.desc().call();

    const testing = <TextTruncate line={6} truncateText="..." text={desc} />;

    this.setState({ foto: foto });
    this.setState({ desc: testing });
    this.setState({ titulo: titulo });
  }

  render() {
    // const { titulo, desc, foto, address } = this.props;
    this.getCampaignState;

    // const alreadyApproved = ;
    return (
      <div class="col s12 m4">
        <div class="card hoverable bordes">
          <div class="card-image">
            <img src={this.state.foto} />

            <Link route={`/campaigns/${this.props.direc}`}>
              <a class="btn-floating halfway-fab waves-effect waves-light buttonsRed">
                <i class="material-icons">add</i>
              </a>
            </Link>
          </div>
          <div class="card-content testClass">
            <span class="card-title truncate testGreen">
              {this.state.titulo}
            </span>
            <p class="white-text">{this.state.desc}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CampaignBox;
