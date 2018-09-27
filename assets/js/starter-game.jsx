import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Board />, root);
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {initLetters: _.shuffle(['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H']),
    selectedLetters: [],
    finished: [],
    clicks: 0};
  }

  isGameOver() {
    return (this.state.finished.length >= 8);
  }

  checkSpace() {
    if (this.state.selectedLetters.length == 2) {
      let state1 = _.assign({},this.state, {selectedLetters: []});
      this.setState(state1);
    }
  }

  setGuesses(index, letter) {
    if (this.state.selectedLetters.length == 0) {
      let state1 = _.assign({},this.state, {selectedLetters: [{idx: index, letter: letter}],
      clicks: (this.state.clicks+1)});
      this.setState(state1);
    } else {
      
      let item = this.state.selectedLetters[0];
      let idx2 = item["idx"];
      let letter2 = item["letter"];
      let state1 = "";
      if (index == idx2) {
        state1 = _.assign({},this.state, {selectedLetters: [],
        clicks: (this.state.clicks+1)});
        this.setState(state1);
      } else if ((index != idx2)&&(letter == letter2)) {
        state1 = _.assign({},this.state, {selectedLetters: [], finished: this.state.finished.concat([letter]),
        clicks: (this.state.clicks+1)});
        this.setState(state1);
      } else {
        state1 = _.assign({}, this.state, {selectedLetters: this.state.selectedLetters.concat([{idx: index, letter: letter}]),
        clicks: (this.state.clicks+1)});
        this.setState(state1);
      }
    }
  }

  getTileRender(idx) {
    let letter = this.state.initLetters[idx];
    let dsp = false;
    if (_.includes(_.map(this.state.selectedLetters, 'idx'), idx)) {
      dsp = true;
    }
    if (_.includes(this.state.finished, letter)) {
      dsp = true;
    }
    let ret = <Tile index={idx}
      display = {dsp}
      letter = {letter}
      root = {this}/>;
    return ret;
  }

  restart(ev) {
    this.setState({initLetters: _.shuffle(['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H']),
    selectedLetters: [],
    finished: [],
    clicks: 0});
  }

  getBoardTemplate() {
    // let ret = <div><p>ploop</p></div>;
    let ret = <div>
    <div className="row">
      <div className="column"><h1>Memory Game</h1></div>
      <div className="column"><p>Clicks: {this.state.clicks}</p></div>
    </div>
    <div className="row">
      {this.getTileRender(0)}
      {this.getTileRender(1)}
      {this.getTileRender(2)}
      {this.getTileRender(3)}
    </div>
    <div className="row">
      {this.getTileRender(4)}
      {this.getTileRender(5)}
      {this.getTileRender(6)}
      {this.getTileRender(7)}
    </div>
    <div className="row">
      {this.getTileRender(8)}
      {this.getTileRender(9)}
      {this.getTileRender(10)}
      {this.getTileRender(11)}
    </div>
    <div className="row">
      {this.getTileRender(12)}
      {this.getTileRender(13)}
      {this.getTileRender(14)}
      {this.getTileRender(15)}
    </div>
    <div className="row">
      <button onClick={this.restart.bind(this)}>RESTART</button>
    </div>
    </div>;
    return ret;
  }

  getGameOver() {
    return <div>
      <h2>Game Over. You win.</h2>
      <h3>Clicks: {this.state.clicks}</h3>
      <button onClick={this.restart.bind(this)}>RESTART</button>
      </div>
  }

  render() {
    if (this.isGameOver()) {
      return this.getGameOver();
    }
    return this.getBoardTemplate();
  }
}

function Tile(params) {
  let { root, index, letter, display } = params;
  let txt = "";
  let className = "closed";

  function setGuess(ev) {
    root.setGuesses(index, letter);
    root.checkSpace();
    display = !display;
  }

  if (display == true) {
    txt = letter;
    className = "open"
  } else {
    txt = "="
  }
  return <div className="column">
    <p><button className={className} onClick={setGuess}>{ txt }</button></p>
  </div>;
}