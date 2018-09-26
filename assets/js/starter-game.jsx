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
    finished: []};
  }

  setGuesses(index, letter) {
    if (this.state.selectedLetters.length == 0) {
      let state1 = _.assign({},this.state, {selectedLetters: this.state.selectedLetters.concat([{idx: index, letter: letter}])});
      this.setState(state1);
    } else {
      let item = this.state.selectedLetters[0];
      let idx2 = item["idx"];
      let letter2 = item["letter"];
      if ((index != idx2)&&(letter == letter2)) {
        let state1 = _.assign({},this.state, {selectedLetters: [], finished: this.state.finished.concat([letter])});
        this.setState(state1);
      } else {
        let state1 = _.assign({},this.state, {selectedLetters: []});
        this.setState(state1);
      }
    }
  }

  getTileRender(idx) {
    let letter = this.state.initLetters[idx];
    let dsp = false;
    console.log(_.map(this.state.selectedLetters, 'idx'));
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

  render() {
    return <div>
      
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
    </div>;
  }
}

function Tile(params) {
  let { root, index, letter, display } = params;
  let txt = "";

  function setGuess(ev) {
    root.setGuesses(index, letter);
    display = !display;
  }

  if (display == true) {
    txt = letter;
  } else {
    txt = "=="
  }
  return <div className="column">
    <p><button onClick={setGuess}>{ txt }</button></p>
  </div>
}