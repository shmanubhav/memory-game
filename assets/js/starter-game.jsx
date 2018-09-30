import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root, channel) {
  ReactDOM.render(<Board channel={channel} />, root);
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {boardMat: [],
      initLetters: [],
    clicks: 0};

    this.channel.join()
      .receive("ok", this.getView.bind(this))
      .receive("error", resp => {console.log("Unable to join ",resp)});
  }

  getView(view) {
    console.log("new view", view);
    this.setState(view.room);
  }

  sendFlip(index) {
    console.log("1",this.channel.push("flip", { idx: index })
      .receive("ok", this.getView.bind(this)));
    console.log("2",this.channel.push("checkBoth", {idx: index})
      .receive("ok", this.getView.bind(this)));
  }

  isGameOver() {
    if (this.state.boardMat.length != 0) {
      return (this.state.boardMat.reduce((acc, val) => acc * val) == 1);
    }
    return false;
  }

  getTileRender(idx) {
    let letter = this.state.initLetters[idx];
    let dsp = this.state.boardMat[idx];
    let ret = <Tile idx={idx}
      boolVal = {dsp}
      letter = {letter}
      root = {this}/>;
    return ret;
  }

  restart(ev) {
    this.channel.push("restart",{}).receive("ok", this.getView.bind(this));
    // this.setState({boardMat: [],
    //   initLetters: [],
    // clicks: 0});
  }

  getBoardTemplate() {
    let ret = <div>
    <div className="row">
      <div className="column"><h2>Clicks: {this.state.clicks}</h2></div>
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
  let { root, idx, boolVal, letter } = params;
  let txt = "";
  let className = "closed";
  let display = false;
  if (boolVal == "1") {
    display = true;
  }

  function setGuess(ev) {
    root.sendFlip(idx);
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