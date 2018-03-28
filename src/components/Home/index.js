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
        this.state = {
            currBlock: null,
            currentCurator: this.web3.eth.accounts[0],
            accounts: [],
            data: [],
        }
    }

    componentWillMount() {
        this.updateDataFromChain();
    }

    handleCuratorSelection = (selectedCurator) => {
        this.setState({ currentCurator: selectedCurator });

    }

    updateDataFromChain = () => {
        console.log('update data from chain');
        const contractInstance = getContractConnection();

        let data = [];

        this.web3.eth.accounts.forEach(address => {
            const randomFrequency = Math.floor(Math.random() * 4 + 1) * 0.25;
            const text = contractInstance.getText(address);
            const frequency = contractInstance.getFrequency(address).toNumber();
            const voteCount = contractInstance.voteCount(address).toNumber();
            data.push({
                frequency: randomFrequency,
                score: voteCount,
                name: 'data provider',
                address: address,
            })
        });

        this.setState({
            currentCurator: this.web3.eth.accounts[0],
            currBlock: this.web3.eth.blockNumber,
            accounts: this.web3.eth.accounts,
            data: data,
        });
    }

    render() {
        const curatorsSelection = this.state.accounts.map(address => ({ value: address, label: address }));
        return (
            <div className="Home">
                <div>
                    <p>Current Block: {this.state.currBlock}</p>
                    <p className="Curator"> Current Curator:
                    <Select
                            name="curator-selector"
                            value={this.state.currentCurator}
                            onChange={this.handleCuratorSelection}
                            options={curatorsSelection}
                        />
                    </p>
                </div>
                <div className="List">
                    <List data={this.state.data} updateDataState={this.updateDataFromChain} />
                </div>
            </div>
        );
    }
}

export default Home;