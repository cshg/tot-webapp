import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import BlinkingDot from '../BlinkingDot';

import getContractConnection, { contractAddress } from '../Contract';
import Web3 from 'web3';

class List extends Component {
	handleUpvote(value) {
		const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
		const contractInstance = getContractConnection();
		const upvoteTargetAddress = value.row.address;
		// const upvoteData = contractInstance.upvote.getData(upvoteTargetAddress);

		// const fromAddress = web3.eth.accounts[0];
		// console.log('upvoting');
		// console.log('from:', fromAddress);
		// console.log('to:', upvoteTargetAddress);

		// web3.eth.sendTransaction({
		// 	to: contractAddress,
		// 	from: fromAddress,
		// 	data: upvoteData,
		// });

		this.props.updateDataState();
	}
	handleDownvote(value) {
		console.log('downvote', value.row);
	}

	render() {
		const data = this.props.data;
		return (
			<div className="List">
				<ReactTable
					data={data}
					defaultSorted={[
						{
							id: "score",
							desc: true
						}
					]}
					columns={[
						{
							Header: " Data",
							columns: [
								{
									Header: "Activity",
									accessor: "frequency",
									Cell: (value => <BlinkingDot frequency={value.row.frequency} />),
								},
								{
									Header: "Score",
									accessor: "score",
								},
								{
									Header: "Name",
									accessor: "name",
								},
								{
									Header: "Address",
									accessor: "address",
								},
							],
						},
						{
							Header: "Voting",
							columns: [
								{
									Header: "Upvote",
									accessor: "upvote",
									Cell: (value => <button onClick={() => this.handleUpvote(value)}>+</button>),
								},
								{
									Header: "Downvote",
									accessor: "downvote",
									Cell: (value => <button onClick={() => this.handleDownvote(value)}>-</button>),
								}
							]
						},
					]}
				/>
			</div >
		);
	}
}

export default List;
