import Web3 from 'web3';

import WeeveRepCoinABI from './WeeveRepCoinABI';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

function getContractConnection() {
    const WeeveRepCoinContract = web3.eth.contract(WeeveRepCoinABI);
    const weeveRepoCoinContractInstance = WeeveRepCoinContract.at('0x1ee1dba36bed02f6a43d2019610bb70a25d447d3');

    console.log('contractInstance', weeveRepoCoinContractInstance);
    return weeveRepoCoinContractInstance;
}

export default getContractConnection;
