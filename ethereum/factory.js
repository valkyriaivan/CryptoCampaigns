import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  'https://rinkeby.infura.io/tfQAVgnTVnzV4xe6g1ao'
);

export default instance;
