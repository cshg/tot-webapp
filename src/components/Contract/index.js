import Web3 from 'web3';

import { WEEVE_REP_COIN_CONTRACT_ADDRESS } from '../../config';
import WeeveRepCoinABI from './WeeveRepCoinABI';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

function getContractConnection() {
    const WeeveRepCoinContract = web3.eth.contract(WeeveRepCoinABI);
    const weeveRepoCoinContractInstance = WeeveRepCoinContract.at(WEEVE_REP_COIN_CONTRACT_ADDRESS);


    console.log('contractInstance', weeveRepoCoinContractInstance);
    return weeveRepoCoinContractInstance;
}

export default getContractConnection;
