import React, { Component } from 'react'
import Board from './components/Board';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXnext: true,
      history: []


    }
  }
  setTheState = (obj) => {
    this.setState(obj)
  }




  render() {

    return (
      <div>
        Thuong's game
        <Board {...this.state} setTheState={this.setTheState} />

      </div>
    )
  }
}
