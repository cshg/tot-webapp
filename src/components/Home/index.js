import React, { Component } from 'react';
import Web3 from 'web3';

import './style.css';
import mockData from './mockData';

import getContractConnection from '../Contract';
import List from '../List';

class Home extends Component {
    constructor(props) {
        super(props);
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

        this.state = {
            currBlock: null,
            accounts: [],
        }
    }

    componentDidMount() {
        console.log('Accounts', this.web3.eth.accounts);
        console.log('blockNum', this.web3.eth.blockNumber);

        const contractInstance = getContractConnection();
        console.log('address:', contractInstance.address);
        console.log('init supply:', contractInstance.INITIAL_SUPPLY());

        const voteCount = contractInstance.voteCount('0xf17f52151ebef6c7334fad080c5704d77216b732')
        console.log('vote count', voteCount);

        this.setState({
            currBlock: this.web3.eth.blockNumber,
            accounts: this.web3.eth.accounts,
        });
    }

    render() {
        console.log('mockData', mockData);
        return (
            <div className="Home">
                <h2>Home</h2>
                <p>Current Block: {this.state.currBlock}</p>
                <div className="List">
                    <List data={mockData} />
                </div>
            </div>
        );
    }
}

export default Home;