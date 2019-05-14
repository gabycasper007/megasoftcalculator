import React, { Component } from "react";

class KeyPadComponent extends Component {
  render() {
    return (
      <div className="calculator">
        <div
          className={this.props.cls + " display"}
          onClick={this.props.activateKeyboard}
        >
          <div className="expression">{this.props.expression}</div>
        </div>
        <button name="square" onClick={this.props.onClick}>
          √
        </button>
        <button name="(" onClick={this.props.onClick}>
          (
        </button>
        <button name=")" onClick={this.props.onClick}>
          )
        </button>
        <button name="CE" onClick={this.props.onClick}>
          CE
        </button>
        <button className="orange" name="AC" onClick={this.props.onClick}>
          AC
        </button>

        <button name="cubic" className="cubic" onClick={this.props.onClick}>
          <sup>3</sup>√
        </button>
        <button name="1" className="digit" onClick={this.props.onClick}>
          1
        </button>
        <button name="2" className="digit" onClick={this.props.onClick}>
          2
        </button>
        <button name="3" className="digit" onClick={this.props.onClick}>
          3
        </button>
        <button className="orange" name="+" onClick={this.props.onClick}>
          +
        </button>

        <button name="power" onClick={this.props.onClick}>
          x<sup>y</sup>
        </button>
        <button name="4" className="digit" onClick={this.props.onClick}>
          4
        </button>
        <button name="5" className="digit" onClick={this.props.onClick}>
          5
        </button>
        <button name="6" className="digit" onClick={this.props.onClick}>
          6
        </button>
        <button className="orange" name="-" onClick={this.props.onClick}>
          -
        </button>

        <button name="factorial" onClick={this.props.onClick}>
          x!
        </button>
        <button name="7" className="digit" onClick={this.props.onClick}>
          7
        </button>
        <button name="8" className="digit" onClick={this.props.onClick}>
          8
        </button>
        <button name="9" className="digit" onClick={this.props.onClick}>
          9
        </button>
        <button className="orange" name="*" onClick={this.props.onClick}>
          x
        </button>

        <button name="log" onClick={this.props.onClick}>
          log
        </button>
        <button name="." className="digit" onClick={this.props.onClick}>
          .
        </button>
        <button name="0" className="digit" onClick={this.props.onClick}>
          0
        </button>
        <button name="=" className="equal" onClick={this.props.onClick}>
          =
        </button>
        <button className="orange" name="/" onClick={this.props.onClick}>
          ÷
        </button>
      </div>
    );
  }
}

export default KeyPadComponent;
