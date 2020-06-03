import React, { Component } from "react";
import Board from "./components/Board";
import "./App.css";

import FacebookLogin from "react-facebook-login";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			isXnext: true,
			history: [],
			facebookName: null,
			topRank: [],
		};
	}
	setTheState = (obj) => {
		this.setState(obj);
	};

	responseFacebook = (response) => {
		console.log(response);
		this.setState({ facebookName: response.name });
		console.log(this.state.facebookName, "day la gi");
	};

	getData = async () => {
		let url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
		let data = await fetch(url);
		let result = await data.json();
		this.setState({ ...this.state, topRank: result.items });
		console.log("what is result?", result);
	};
	componentDidMount() {
		this.getData();
	}

	render() {
		return (
			<div>
				{this.state.facebookName === null ? (
					<FacebookLogin appId="690212825111085" autoLoad={false} fields="name,email,picture" onClick={this.componentClicked} callback={this.responseFacebook} />
				) : (
					""
				)}
				<h1> User Name: {this.state.facebookName}</h1>
				<h2> Top Rank</h2>
				<div>
					{this.state.topRank.map((item) => {
						return (
							<div>
								{item.player}:{item.score}
							</div>
						);
					})}
				</div>

				<Board {...this.state} setTheState={this.setTheState} />
			</div>
		);
	}
}
