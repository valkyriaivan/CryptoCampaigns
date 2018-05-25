import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x44e10122A1e0783Fe5C8fD7F6B06fc955f33cAA5'
);

export default instance;
