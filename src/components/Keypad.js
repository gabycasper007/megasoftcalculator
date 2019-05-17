import cx from "classnames";
import React, { PureComponent } from "react";
import axios from "../axios";
import * as helper from "../helper.js";
import * as updaters from "../updaters";
import Button from "./Button";

class KeyPad extends PureComponent {
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
    } else if (clicked === "=") {
      if (this.state.expression !== "0") {
        this.handleEqual();
      }
    } else {
      if (!this.state.expression.endsWith("(")) {
        this.setState(state => updaters.setFactorialOrPower(state, clicked));
      }
    }
  };

  handleEqual = async () => {
    try {
      let response = await axios.post("/equal", {
        expression: this.state.expression
      });
      let result = response.data.toString();
      let expression = this.state.expression;
      this.setState({
        ...helper.initialState,
        decimals: helper.hasDecimals(result),
        expression: result
      });

      this.saveCalculation(expression, result);
    } catch (error) {
      console.log(error);
    }
  };

  saveCalculation = async (expression, result) => {
    if (expression !== result) {
      await axios.put("/history", {
        command: expression,
        result
      });
    }
  };

  render() {
    const missingParentheses =
      this.state.parentheses.opened - this.state.parentheses.closed;

    let closedP = "";
    let buttons = ["√", "(", ")", "CE", "AC"];
    buttons = buttons.concat("∛", "1", "2", "3", "/");
    buttons = buttons.concat("^", "4", "5", "6", "*");
    buttons = buttons.concat("!", "7", "8", "9", "-");
    buttons = buttons.concat("log", ".", "0", "=", "+");

    for (let i = 0; i < missingParentheses; i++) {
      closedP += ")";
    }

    return (
      <div className="mega">
        <h1>Megasoft Calculator</h1>
        <div id="copy">by Gabriel Vasile</div>
        <div className="calculator">
          <div
            className={cx("display", { active: this.props.keyboardActive })}
            onClick={this.props.activateKeyboard}
          >
            <div className="expression">
              {this.state.expression}
              <span className="balancedParenthesis">{closedP}</span>
            </div>
          </div>
          {buttons.map(button => (
            <Button
              name={button}
              key={button}
              onClick={this.handleClick}
              onMouseDown={this.props.deactivateKeyboard}
              onMouseUp={this.props.activateKeyboard}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default KeyPad;
