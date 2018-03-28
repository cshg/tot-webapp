import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import logo from './logo.svg';
import './styles.css';

import Home from '../Home';
// import ListItem from '../ListItem';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					{/* <img src={logo} className="App-logo" alt="logo" /> */}
					<h2 >ToT: Curator View</h2>
				</header>
				<div className="App-nav">
					<Router>
						<div>
							{/* <Link to="/">Home</Link> */}
							{/* <Link to="/ListItem">ListItem</Link> */}
							<Route exact path="/" component={Home} />
							{/* <Route path="/ListItem" render={() => (
								<h3>Please select a list item</h3>
							)} />
							<Route exact path="/ListItemID" component={ListItem} /> */}
						</div>
					</Router>
				</div>
			</div>
		);
	}
}

export default App;
