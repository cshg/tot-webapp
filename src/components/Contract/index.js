import Web3 from 'web3';

import WeeveRepCoinABI from './WeeveRepCoinABI';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

function getContractConnection() {
    const WeeveRepCoinContract = web3.eth.contract(WeeveRepCoinABI);
    const weeveRepoCoinContractInstance = WeeveRepCoinContract.at('0xc0ed63e3a70bfcb003452b1cc083db822e1f23e1');

    console.log('contractInstance', weeveRepoCoinContractInstance);
    return weeveRepoCoinContractInstance;
}

export default getContractConnection;
