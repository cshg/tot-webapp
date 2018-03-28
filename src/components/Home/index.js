import React, { Component } from 'react';
import Web3 from 'web3';

import './style.css';
import mockData from './mockData';
import coursetroABI from './CoursetroABI';

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

        this.web3.eth.defaultAccount = this.web3.eth.accounts[0];

        const MyContract = this.web3.eth.contract(coursetroABI);
        const myContractInstance = MyContract.at('0x8cdaf0cd259887258bc13a92c0a6da92698644c0');
        console.log('myContract', myContractInstance);

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