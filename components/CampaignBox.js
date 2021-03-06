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

    const testing = <TextTruncate line={4} truncateText="..." text={desc} />;

    this.setState({ foto: foto });
    this.setState({ desc: testing });
    this.setState({ titulo: titulo });
  }

  render() {
    // const { titulo, desc, foto, address } = this.props;
    this.getCampaignState;

    // const alreadyApproved = ;
    return (
      <div className="col s12 m4">
        <div className="card hoverable bordes">
          <div className="card-image">
            <img src={this.state.foto} />

            <Link route={`/campaigns/${this.props.direc}`}>
              <a className="btn-floating halfway-fab buttonsRed">
                <i className="fab fa-ethereum" />
              </a>
            </Link>
          </div>
          <div className="card-content testClass">
            <span className="card-title truncate testGreen">
              {this.state.titulo}
            </span>
            <p className="white-text">{this.state.desc}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CampaignBox;
