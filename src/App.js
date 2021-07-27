import React, { Component } from 'react';
import Video from './Video';
import Home from './Home';
// import Time from './Time';
import EndTime from './endingPage';
import Create from './Create'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/join/:url" component={Video} />
						{/* <Route path="/Time" exact component={Time} /> */}
						<Route path="/meetEnd" exact component={EndTime}></Route>
						<Route path="/join/:url1" component={Video} />
					</Switch>
				</Router>
			</div>
		)
	}
}

export default App;