import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import BlinkingDot from '../BlinkingDot';
import './style.css';

import getContractConnection, { contractAddress } from '../Contract';
import Web3 from 'web3';

class List extends Component {
	handleUpvote(value) {
		this.props.sendUpvote(value.row.address);

	}
	handleDownvote(value) {
		this.props.sendDownvote(value.row.address);
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
									maxWidth: 70,
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
									Cell: (value => <div className="button_vote button_plus" onClick={() => this.handleUpvote(value)}>+</div>),
									maxWidth: 100,
								},
								{
									Header: "Score",
									accessor: "score",
									maxWidth: 80,
								},
								{
									Header: "Downvote",
									accessor: "downvote",
									Cell: (value => <div className="button_vote button_minus" onClick={() => this.handleDownvote(value)}>-</div>),
									maxWidth: 100,
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
