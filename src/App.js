import React, { Component } from "react";
import "./App.css";
import Keypad from "./components/Keypad";
import * as helper from "./helper.js";

class App extends Component {
  state = { ...helper.initialState };

  setOperation = operation => {
    this.setState(state => {
      let expression = state.expression;
      let decimals = state.decimals;
      let keyboardActive = state.keyboardActive;

      if (
        ![".", "(", "-"].includes(helper.getLastCharacter(state.expression)) ||
        (helper.getLastCharacter(state.expression) === "-" &&
          helper.getCharBeforeLastChar(state.expression) !== "(")
      ) {
        expression =
          (state.operation
            ? helper.removeLastCharacter(state.expression)
            : state.expression) + operation;
        decimals = false;
      } else if (
        helper.getLastCharacter(state.expression) === "(" &&
        operation === "-"
      ) {
        expression = state.expression + operation;
      } else {
        keyboardActive = true;
      }

      return {
        keyboardActive,
        expression,
        operation,
        decimals
      };
    });
  };

  setDigit = digit => {
    this.setState(state => {
      let expression = state.expression;
      let doesntHaveDecimalsAndDoesntStartWithZero =
        !helper.hasDecimals(digit) && !helper.startsWithZero(expression);

      if (expression === "0") {
        if (digit === "0") {
          expression = "0";
        } else {
          expression = digit;
        }
      } else if (digit === "0") {
        if (
          helper.hasDecimals(expression) ||
          doesntHaveDecimalsAndDoesntStartWithZero
        ) {
          expression += digit;
        }
      } else {
        if (expression[expression.length - 1] === "0") {
          expression = helper.removeLastCharacter(expression);
        }
        expression += digit;
      }

      return {
        expression,
        operation: ""
      };
    });
  };

  reset = () => {
    this.setState(state => {
      return {
        ...helper.initialState,
        keyboardActive: state.keyboardActive
      };
    });
  };

  setDecimalsSeparator = () => {
    this.setState(state => {
      return {
        expression: state.decimals
          ? state.expression
          : state.expression === "0"
          ? "."
          : state.expression + ".",
        decimals: true
      };
    });
  };

  back = () => {
    this.setState(state => {
      const last = state.expression[state.expression.length - 1];

      let newState = {
        ...state
      };
      const newLast = newState.expression[state.expression.length - 1];

      if (state.expression.length === 1) {
        newState = { ...helper.initialState };
      } else {
        newState.expression = helper.removeLastCharacter(state.expression);
      }

      if (helper.isOperation(last)) {
        newState.operation = "";
        if (helper.hasDecimals(newState.expression)) {
          newState.decimals = true;
        }
      } else if (helper.isDecimalSeparator(last)) {
        newState.decimals = false;
      } else if (helper.isDigit(last) && helper.isOperation(newLast)) {
        newState.operation = newLast;
      } else if (helper.isOpenParenthesis(last)) {
        if (helper.hasDecimals(newState.expression)) {
          newState.decimals = true;
        }
      }

      return newState;
    });
  };

  openParenthesis = () => {
    this.setState(state => {
      if (helper.getLastCharacter(state.expression) === ".") {
        state.expression = helper.removeLastCharacter(state.expression);
      }
      return {
        decimals: false,
        parentheses: {
          ...state.parentheses,
          opened: state.parentheses.opened + 1
        },
        expression: state.expression === "0" ? "(" : state.expression + "("
      };
    });
  };

  closeParenthesis = () => {
    if (
      this.state.parentheses.opened > this.state.parentheses.closed &&
      helper.getLastCharacter(this.state.expression) !== "("
    ) {
      this.setState(state => {
        if (helper.getLastCharacter(state.expression)) {
          state.expression = helper.removeLastCharacter(state.expression);
        }

        return {
          parentheses: {
            ...state.parentheses,
            closed: state.parentheses.closed + 1
          },
          expression: state.expression + ")"
        };
      });
    }
  };

  handleClick = event => {
    let clicked = event.target.name;

    if (helper.isOperation(clicked)) {
      this.setOperation(clicked);
    } else if (helper.isDigit(clicked)) {
      this.setDigit(clicked);
    } else if (clicked === "AC") {
      this.reset();
    } else if (clicked === ".") {
      this.setDecimalsSeparator();
    } else if (clicked === "CE") {
      this.back();
    } else if (clicked === "(") {
      this.openParenthesis();
    } else if (clicked === ")") {
      this.closeParenthesis();
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
