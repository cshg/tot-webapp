import React, { Component } from 'react';
import Web3 from 'web3';

import './style.css';
import mockData from './mockData';

import getContractConnection, { contractAddress } from '../Contract';
import List from '../List';

class Home extends Component {
    constructor(props) {
        super(props);
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        this.state = {
            currBlock: null,
            currentCurator: null,
            accounts: [],
            data: [],
        }
    }

    componentWillMount() {
        const contractInstance = getContractConnection();

        const numOfAccounts = 4;
        let accountAddresses = [];
        let data = [];

        for (let i = 0; i < numOfAccounts; i++) {
            accountAddresses.push(this.web3.eth.accounts[i]);
        }
        accountAddresses.forEach(address => {
            const randomFrequency = Math.floor(Math.random() * 4) * 0.25;
            const text = contractInstance.getText(address);
            console.log('text from entry', text);
            const frequenzy = contractInstance.getFrequency(address).toNumber();
            console.log('frequency from entry', frequenzy);
            data.push({
                score: contractInstance.voteCount(address).toNumber(),
                name: 'data provider',
                address: address,
                frequency: randomFrequency,
            })
        });

        const upvote = contractInstance.upvote.getData(accountAddresses[1]);

        this.web3.eth.sendTransaction({
            to: contractAddress,
            from: accountAddresses[0],
            data: upvote,
        });

        console.log('data', data);

        this.setState({
            currentCurator: accountAddresses[0],
            currBlock: this.web3.eth.blockNumber,
            accounts: this.web3.eth.accounts,
            data: data,
        });
    }

    render() {
        console.log('mockData', mockData);
        return (
            <div className="Home">
                <h2>Home</h2>
                <p>Current Block: {this.state.currBlock}</p>
                <div> Current Curator: </div>
                <div className="List">
                    <List data={this.state.data} />
                </div>
            </div>
        );
    }
}

export default Home;