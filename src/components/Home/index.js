import React, { Component } from 'react';
import Web3 from 'web3';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import './style.css';

import getContractConnection, { contractAddress } from '../Contract';
import List from '../List';

class Home extends Component {
    constructor(props) {
        super(props);
        this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        this.contractInstance = getContractConnection();
        const initialAccount = this.web3.eth.accounts[0];
        this.state = {
            currBlock: this.web3.eth.blockNumber,
            currentCuratorAddress: initialAccount,
            currentEthBalance: this.web3.fromWei(this.web3.eth.getBalance(initialAccount).toNumber()),
            currentToTBalance: this.contractInstance.balanceOf(initialAccount).toNumber(),
            accounts: this.web3.eth.accounts,
            data: [],
        }
    }

    componentWillMount() {
        this.updateDataFromChain();
    }

    handleCuratorSelection = (selectedCurator) => {
        const selectedCuratorAddress = selectedCurator.value;
        this.setState({
            currentCuratorAddress: selectedCuratorAddress,
            currentEthBalance: this.web3.fromWei(this.web3.eth.getBalance(selectedCuratorAddress).toNumber()),
            currentToTBalance: this.contractInstance.balanceOf(selectedCuratorAddress).toNumber(),
        });
    }

    sendUpvote = (address) => {
        const upvoteAddress = this.contractInstance.upvote.getData(address);

        this.web3.eth.sendTransaction({
            to: contractAddress,
            from: this.state.currentCuratorAddress,
            data: upvoteAddress,
        });

        this.updateDataFromChain();
    }

    sendDownvote = (address) => {
        const downvoteAddress = this.contractInstance.downvote.getData(address);

        this.web3.eth.sendTransaction({
            to: contractAddress,
            from: this.state.currentCuratorAddress,
            data: downvoteAddress,
        });

        this.updateDataFromChain();
    }

    updateDataFromChain = () => {
        console.log('update data from chain');

        let data = [];

        this.web3.eth.accounts.forEach(address => {
            const randomFrequency = Math.floor(Math.random() * 4 + 1) * 0.25;
            const text = this.contractInstance.getText(address);
            const frequency = this.contractInstance.getFrequency(address).toNumber();
            const voteCount = this.contractInstance.voteCount(address).toNumber();
            data.push({
                frequency: randomFrequency,
                score: voteCount,
                name: 'data provider',
                address: address,
            })
        });

        this.setState({ data });
    }

    render() {
        const curatorsSelection = this.state.accounts.map(address => ({ value: address, label: address }));
        return (
            <div className="Home">
                <div>
                    <p>Current Block: {this.state.currBlock}</p>
                    <div className="Curator"> Current Curator:
                    <Select
                            name="curator-selector"
                            value={this.state.currentCuratorAddress}
                            onChange={this.handleCuratorSelection}
                            options={curatorsSelection}
                        />
                    </div>
                    <div>ETH Balance: {this.state.currentEthBalance}</div>
                    <div style={{ fontSize: 24 }}>ToT Balance: {this.state.currentToTBalance}</div>
                </div>
                <div className="List">
                    <List data={this.state.data} sendUpvote={this.sendUpvote} sendDownvote={this.sendDownvote} />
                </div>
            </div>
        );
    }
}

export default Home;