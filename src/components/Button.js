import cx from "classnames";
import React, { PureComponent } from "react";
import { isDigit, isOperation } from "../helper";

class Button extends PureComponent {
  render() {
    return (
      <button
        name={this.props.name}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        className={cx({
          digit: isDigit(this.props.name) || this.props.name.endsWith("."),
          equal: this.props.name.endsWith("="),
          orange: isOperation(this.props.name) || this.props.name === "AC"
        })}
      >
        {this.props.name === "*"
          ? "x"
          : this.props.name === "/"
          ? "÷"
          : this.props.name === "!"
          ? "x!"
          : this.props.name === "^"
          ? "x"
          : this.props.name}

        {this.props.name === "^" && <sup>y</sup>}
      </button>
    );
  }
}

export default Button;
