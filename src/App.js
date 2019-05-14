import React, { Component } from "react";
import "./App.css";
import Keypad from "./components/Keypad";
import * as helper from "./helper.js";
import * as updaters from "./updaters";

class App extends Component {
  state = { ...helper.initialState };

  handleClick = event => {
    let clicked = event.target.name || "^";

    if (helper.isOperation(clicked)) {
      this.setState(state => updaters.setOperation(state, clicked));
    } else if (helper.isDigit(clicked)) {
      this.setState(state => updaters.setDigit(state, clicked));
    } else if (["√", "∛", "log"].includes(clicked)) {
      this.setState(state => updaters.setRootOrLog(state, clicked));
    } else if (clicked === "AC") {
      this.setState(updaters.reset);
    } else if (clicked === ".") {
      this.setState(updaters.setDecimalsSeparator);
    } else if (clicked === "CE") {
      this.setState(updaters.back);
    } else if (clicked === "(") {
      this.setState(updaters.openParenthesis);
    } else if (clicked === ")") {
      if (
        this.state.parentheses.opened > this.state.parentheses.closed &&
        !this.state.expression.endsWith("(")
      ) {
        this.setState(updaters.closeParenthesis);
      }
    } else {
      if (!this.state.expression.endsWith("(")) {
        this.setState(state => updaters.setFactorialOrPower(state, clicked));
      }
    }
  };

  activateKeyboard = () => {
    this.setState({
      keyboardActive: true
    });
  };

  deactivateKeyboard = e => {
    if (
      (e.target.nodeName !== "BUTTON" &&
        e.target.className.indexOf("display") === -1 &&
        e.target.className.indexOf("expression") === -1) ||
      (e.target.nodeName === "BUTTON" && e.type === "mousedown")
    ) {
      this.setState({
        keyboardActive: false
      });
    }
  };

  render = () => {
    return (
      <div className="App" onClick={this.deactivateKeyboard}>
        <div className="wrap">
          <h1>Megasoft Calculator</h1>
          <div id="copy">by Gabriel Vasile</div>
          <Keypad
            onClick={this.handleClick}
            expression={this.state.expression}
            activateKeyboard={this.activateKeyboard}
            cls={this.state.keyboardActive ? "active" : ""}
            parentheses={this.state.parentheses}
            onMouseDown={this.deactivateKeyboard}
            onMouseUp={this.activateKeyboard}
          />
        </div>
      </div>
    );
  };
}

export default App;
