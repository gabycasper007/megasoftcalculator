import React, { PureComponent } from "react";
import Button from "./Button";

class KeyPad extends PureComponent {
  render() {
    const missingParentheses =
      this.props.parentheses.opened - this.props.parentheses.closed;

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
      <div className="calculator">
        <div
          className={this.props.cls + " display"}
          onClick={this.props.activateKeyboard}
        >
          <div className="expression">
            {this.props.expression}
            <span className="balancedParenthesis">{closedP}</span>
          </div>
        </div>
        {buttons.map(button => (
          <Button
            name={button}
            key={button}
            onClick={this.props.onClick}
            onMouseDown={this.props.onMouseDown}
            onMouseUp={this.props.onMouseUp}
          />
        ))}
      </div>
    );
  }
}

export default KeyPad;
