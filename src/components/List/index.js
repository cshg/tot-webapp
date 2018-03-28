import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import BlinkingDot from '../BlinkingDot';

class List extends Component {
	handleUpvote(value) {
		console.log('upvote', value.row);
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
					columns={[
						{
							Header: " Data",
							columns: [
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
								{
									Header: "Frequency",
									accessor: "frequency",
									Cell: (value => <BlinkingDot frequency={value.row.frequency}/>),
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
