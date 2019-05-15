exports.default = class Expression {
  constructor(expression) {
    this.expression = expression;
  }

  removeSpaces() {
    this.expression = this.expression.replace(/\s+/g, "");
    return this;
  }

  replaceFuncs() {
    this.expression = this.expression.replace("sqrt", "√");
    this.expression = this.expression.replace("cbrt", "∛");
  }

  addParenthesesForRoots() {
    this.expression = this.expression.replace(/(√|∛)(-?[\d.])+/g, "$1($2)");
  }

  calculate() {
    this.removeSpaces();
    this.replaceFuncs();
    this.addParenthesesForRoots();

    let result = this.handleParentheses(this.expression);

    return this.roundToMaxTenDecimals(result);
  }

  handleParentheses(s) {
    s = this.balanceParentheses(s);

    let start = s.lastIndexOf("(");

    if (start > -1) {
      this.splitParentheses(s, start);
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

  splitParentheses(s, start) {
    let end = start + s.substr(start).indexOf(")");
    let result, left, middle;
    middle = s.substr(start + 1, end - 1);

    left = s.substr(0, start - 1);
    if (s[start - 1] === "√") {
      middle = Math.sqrt(this.handleParentheses(middle));
    } else if (s[start - 1] === "∛") {
      middle = Math.cbrt(this.handleParentheses(middle));
    } else {
      left = s.substr(0, start);
      middle = this.handleParentheses(middle);
    }

    result = this.handleParentheses(left + middle + s.substr(end + 1));

    return result;
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

    // This parenthesis just helps Bracket Pair Colorizer Plugin
    // to work correctly, which was broken because
    // of the next one "("

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
