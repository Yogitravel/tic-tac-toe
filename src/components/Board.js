import React, { Component } from "react";
import Square from "./Square";

export default class Board extends Component {
	renderSquare = (num) => {
		return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]} />;
	};

	calculateWinner = (squares) => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
		return null;
	};

	boxClick = (id) => {
		if (!this.calculateWinner(this.props.squares)) {
			console.log("x hay o", id);
			//doi value tu null thanh X o array index number id
			let squaresFromApp = this.props.squares;
			console.log("dang o square nao", squaresFromApp);
			if (squaresFromApp[id] !== null) {
				alert("Clicked!");
				return; //ko chay duoc nua
			}
			//doi gia tri null thanh X
			squaresFromApp[id] = this.props.isXnext ? "X " : "O";
			console.log("change X", squaresFromApp);

			//phai show len man hinh, render, su dung state
			this.props.setTheState({ squares: squaresFromApp, isXnext: !this.props.isXnext, history: [...this.props.history, { square: squaresFromApp.slice(), isXnext: !this.props.isXnext }] });
		} else {
			return;
		}
	};
	goBackInTime = (id) => {
		console.log(this.props.history[id]);
		this.props.setTheState({
			squares: [...this.props.history[id].square],
		});
	};

	postData = async () => {
		let data = new URLSearchParams();
		data.append("player", "Thuong Bien");
		data.append("score", 3);
		const url = `http://ftw-highscores.herokuapp.com/tictactoe-dev`;
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: data.toString(),
			json: true,
		});
		console.log("resposne ko?", response);
	};

	render() {
		console.log(this.props.history, "historyyyyyyy");

		const winner = this.calculateWinner(this.props.squares);
		let status;
		if (winner) {
			status = "Winner: " + winner;
			alert(" The winner is " + winner);
			this.postData(); //post data
		} else {
			status = "Next player: " + (this.props.isXnext ? "X" : "O");
		}

		return (
			<div>
				<div>
					<h2> {status}</h2>
				</div>

				{this.props.history.map((elm, index) => {
					return <button onClick={() => this.goBackInTime(index)}>Move {index + 1}</button>;
				})}
				<div className="row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>

				<div className="row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>

				<div className="row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}
