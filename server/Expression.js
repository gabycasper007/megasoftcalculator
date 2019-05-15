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
    let result = this.calculateInsideParentheses(this.expression);

    return this.roundToMaxTenDecimals(result);
  }

  calculateInsideParentheses(s) {
    s = this.balanceParentheses(s);
    let start = s.lastIndexOf("(");
    let end = start + s.substr(start).indexOf(")");
    let result;

    if (start > -1) {
      result = this.calculateInsideParentheses(
        s.substr(0, start) +
          this.calculateInsideParentheses(s.substr(start + 1, end - 1)) +
          s.substr(end + 1)
      );

      return result;
    } else {
      let obj = {
        numbers: this.getNumbers(s),
        operators: this.getOperators(s)
      };
      obj.operators.length = obj.numbers.length - 1;

      this.executeOperation(obj, "*", "/");
      this.executeOperation(obj, "+", "-");

      return obj.numbers.shift();
    }
  }

  getNumbers(s) {
    let result = s
      .split(/(?!^-)(?<![-+/*)])[-+/*]/)
      .filter(x => x)
      .map(x => parseFloat(x));

    return result;
  }

  getOperators(s) {
    let result = s.split(/[\d.]+|(?<![\d.])-[\d.]+/).filter(x => x);

    return result;
  }

  balanceParentheses(s) {
    let missing = 0;
    for (let i = 0, n = s.length; i < n; i++) {
      if (s[i] === "(") {
        missing++;
      } else if (s[i] === ")") {
        missing--;
      }
    }

    return missing > 0 ? s + ")".repeat(missing) : s;
  }

  executeOperation(obj, ...ops) {
    let result;
    for (let i = 0, n = obj.operators.length; i < n; i++) {
      let op = obj.operators[i];

      if (ops.includes(op)) {
        if (op === "/") {
          result = obj.numbers[i] / obj.numbers[i + 1];
        } else if (op === "*") {
          result = obj.numbers[i] * obj.numbers[i + 1];
        } else if (op === "+") {
          result = obj.numbers[i] + obj.numbers[i + 1];
        } else if (op === "-") {
          result = obj.numbers[i] - obj.numbers[i + 1];
        }

        this.completeOperation(obj, i, result);
        i--;
      }
    }

    return result;
  }

  completeOperation(obj, index, result) {
    obj.operators = this.arrayRemove(obj.operators, index);

    obj.numbers = obj.numbers
      .slice(0, index)
      .concat(result, obj.numbers.slice(index + 2));

    return obj;
  }

  roundToMaxTenDecimals(number) {
    return Math.round(number * 1e10) / 1e10;
  }

  arrayRemove(arr, ...indexes) {
    return arr.filter((elem, index) => !indexes.includes(index));
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
};
