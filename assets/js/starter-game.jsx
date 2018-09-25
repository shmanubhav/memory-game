import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export default function game_init(root) {
  ReactDOM.render(<Board />, root);
}

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: false,
      value: props.initVal};
    this.flip = this.flip.bind(this);
  }

  flip(_ev) {
    let state1 = _.assign({}, this.state, {display: !this.state.display});
    this.setState(state1);
    this.props.afterClick(_ev, this.state.value, this.state.display)
  }
  
  flipAuto(_ev) {
    let state1 = _.assign({}, this.state, {display: !this.state.display});
    this.setState(state1);
  }

  render() {
    let text = "";
    if (this.state.display == true) {
      text = this.state.value;
    }
    else {
      text = "Close"
    }

    return <div className="column">
      <p><button onClick={this.flip}>{text}</button></p>
    </div>
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {initLetters: _.shuffle(['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H']),
    selectedLetters: []}
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event, val, display) {
    if (this.state.selectedLetters.length == 0) {
      let state1 = _.assign({}, this.state, {selectedLetters: this.state.selectedLetters.push(val)})
      this.setState(state1);
    } else if (this.state.selectedLetters.length == 1) {
      let let1 = this.state.selectedLetters.pop();
      let let2 = val;
      if (let1 == let2) {
        console.log('same');
      } else {
        console.log('not same');
      }
      let state1 = _.assign({}, this.state, {selectedLetters: []});
      this.setState(state1);
    } else {
      console.log('Never reaches here');
      let state2 = _.assign({}, this.state, {selectedLetters: []});
      this.setState(state2);
      console.log(this.state2.selectedLetters);
    }
    console.log(this.state.selectedLetters);
  }

  render() {
    return <div>
      <div className="row">
        <Tile initVal={this.state.initLetters[0]}
          afterClick={this.handleInputChange}/>
        <Tile initVal={this.state.initLetters[1]}
          afterClick={this.handleInputChange}/>
        <Tile initVal={this.state.initLetters[2]}
          afterClick={this.handleInputChange}/>
        <Tile initVal={this.state.initLetters[3]}
          afterClick={this.handleInputChange}/>
      </div>
      <div className="row">
      <Tile initVal={this.state.initLetters[4]}
          afterClick={this.handleInputChange}/>
      <Tile initVal={this.state.initLetters[5]}
          afterClick={this.handleInputChange}/>
      <Tile initVal={this.state.initLetters[6]}
          afterClick={this.handleInputChange}/>
      <Tile initVal={this.state.initLetters[7]}
          afterClick={this.handleInputChange}/>
      </div>
      <div className="row">
      <Tile initVal={this.state.initLetters[8]}
          afterClick={this.handleInputChange}/>
      <Tile initVal={this.state.initLetters[9]}
          afterClick={this.handleInputChange}/>
      <Tile initVal={this.state.initLetters[10]}
          afterClick={this.handleInputChange}/>
      <Tile initVal={this.state.initLetters[11]}
          afterClick={this.handleInputChange}/>
      </div>
      <div className="row">
      <Tile initVal={this.state.initLetters[12]}
          afterClick={this.handleInputChange}/>
      <Tile initVal={this.state.initLetters[13]}
          afterClick={this.handleInputChange}/>
      <Tile initVal={this.state.initLetters[14]}
          afterClick={this.handleInputChange}/>
      <Tile initVal={this.state.initLetters[15]}
          afterClick={this.handleInputChange}/>
      </div>
    </div>;
  }
}