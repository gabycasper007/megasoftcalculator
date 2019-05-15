exports.default = class Expression {
  constructor(expression) {
    this.expression = expression;
  }

  removeSpaces() {
    this.expression = this.expression.replace(/\s+/g, "");
    return this;
  }

  calculate() {
    this.removeSpaces();
    this.splitOperands();
    this.executeOperation("*", "/");
    this.executeOperation("+", "-");

    this.expression.result = this.expression.numbers[0];

    return this.roundToMaxTenDecimals(this.expression.result);
  }

  roundToMaxTenDecimals(number) {
    return Math.round(number * 1e10) / 1e10;
  }

  arrayRemove(arr, ...indexes) {
    return arr.filter((elem, index) => !indexes.includes(index));
  }

  splitOperands() {
    this.expression = {
      numbers: this.expression
        .split(/[^\d.]+/)
        .filter(x => x)
        .map(x => parseFloat(x)),
      operators: this.expression.split(/[\d.]+/).filter(x => x)
    };
    this.expression.operators.length = this.expression.numbers.length - 1;
  }

  executeOperation(...ops) {
    let result,
      obj = {};
    for (let i = 0; i < this.expression.operators.length; i++) {
      let op = this.expression.operators[i];

      obj[i] = {
        op: this.expression.operators[i],
        inc: ops.includes(op)
      };

      if (ops.includes(op)) {
        if (op === "/") {
          result = this.expression.numbers[i] / this.expression.numbers[i + 1];
        } else if (op === "*") {
          result = this.expression.numbers[i] * this.expression.numbers[i + 1];
        } else if (op === "+") {
          result = this.expression.numbers[i] + this.expression.numbers[i + 1];
        } else if (op === "-") {
          result = this.expression.numbers[i] - this.expression.numbers[i + 1];
        }
        this.completeOperation(i, result);
        i--;
      }
    }
    this.expression.obj = obj;
  }

  setNumbers(numbers) {
    this.expression = {
      ...this.expression,
      numbers
    };
  }

  setOperators(operators) {
    this.expression = {
      ...this.expression,
      operators
    };
  }

  completeOperation(index, result) {
    this.expression.operators = this.arrayRemove(
      this.expression.operators,
      index
    );

    this.expression.numbers = this.expression.numbers
      .slice(0, index)
      .concat(result, this.expression.numbers.slice(index + 2));

    return this.expression;
  }
};
