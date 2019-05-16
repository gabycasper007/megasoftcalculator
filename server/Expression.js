exports.default = class Expression {
  constructor(expression) {
    this.expression = expression;
  }

  calculate() {
    this.removeSpaces();
    this.replaceFuncNames();
    this.addParenthesesForRootsAndLogs();

    let result = this.handleParentheses(this.expression);

    return this.roundToMaxTenDecimals(result);
  }

  handleParentheses(expression) {
    expression = this.balanceParentheses(expression);

    let start = expression.lastIndexOf("(");

    if (start > -1) {
      return this.splitParentheses(expression, start);
    } else {
      expression = this.executeFactorial(expression);
      expression = this.executePower(expression);

      let obj = {
        numbers: this.getNumbers(expression),
        operators: this.getOperators(expression)
      };
      obj.operators.length = obj.numbers.length - 1;

      this.executeBasicOperations(obj, "*", "/");
      this.executeBasicOperations(obj, "+", "-");

      return obj.numbers.shift();
    }
  }

  splitParentheses(expression, start) {
    let end = start + expression.substr(start).indexOf(")");
    let middle = expression.substr(start + 1, end - 1);
    let left;

    if (expression[start - 1] === "√") {
      left = expression.substr(0, start - 1);
      middle = Math.sqrt(this.handleParentheses(middle));
    } else if (expression[start - 1] === "∛") {
      left = expression.substr(0, start - 1);
      middle = Math.cbrt(this.handleParentheses(middle));
    } else if (expression[start - 1] === "g") {
      left = expression.substr(0, start - 3);
      middle = Math.log10(this.handleParentheses(middle));
    } else {
      left = expression.substr(0, start);
      middle = this.handleParentheses(middle);
    }

    return this.handleParentheses(left + middle + expression.substr(end + 1));
  }

  executePower(expression) {
    let lastIndexOfPower = expression.lastIndexOf("^");

    if (lastIndexOfPower > 0) {
      let [
        leftNumber,
        rightNumber,
        leftIndex,
        rightIndex
      ] = this.extractNumbersForPower(expression, lastIndexOfPower);

      let newExpression =
        expression.slice(0, leftIndex) +
        leftNumber ** rightNumber +
        expression.slice(rightIndex);

      if (newExpression.indexOf("^") > 0) {
        return this.executePower(newExpression);
      }
      return newExpression;
    }
    return expression;
  }

  extractNumbersForPower(expression, lastIndexOfPower) {
    let start = lastIndexOfPower - 1;
    let end = lastIndexOfPower + 1;
    let regex = /[-\d.]/;

    while (start > -1 && regex.test(expression[start - 1])) {
      start--;
    }

    while (end < expression.length && regex.test(expression[end + 1])) {
      end++;
    }

    return [
      expression.slice(start, lastIndexOfPower),
      expression.slice(lastIndexOfPower + 1, end + 1),
      start,
      end + 1
    ];
  }

  executeFactorial(expression) {
    let lastIndexOfFact = expression.lastIndexOf("!");

    if (lastIndexOfFact > 0) {
      let [newExpression, start] = this.extractNumberForFactorial(
        expression,
        lastIndexOfFact
      );

      return (
        expression.slice(0, start) +
        this.multiFactorial(
          newExpression,
          this.getFactorialType(expression, newExpression, start)
        ) +
        expression.slice(lastIndexOfFact + 1)
      );
    }
    return expression;
  }

  extractNumberForFactorial(expression, indexOfFact) {
    let start = indexOfFact - 1;
    let firstIndexOfFact = indexOfFact;

    while (start > -1 && /^[\d.!]$/.test(expression[start - 1])) {
      if (expression[start] === "!") {
        firstIndexOfFact = start;
      }
      start--;
    }

    return [expression.slice(start, firstIndexOfFact), start];
  }

  // Factorial can be double !!, triple !!!, etc.
  getFactorialType(expression, newExpression, start) {
    let multi = expression.length - newExpression.length;
    if (expression[start - 1] === "-") {
      multi--;
    }
    return multi;
  }

  multiFactorial(number, multi) {
    let result = 1;
    number = parseFloat(number);

    if (Number.isInteger(number)) {
      for (let i = number; i > 1; i -= multi) {
        result *= i;
      }
    } else {
      result = this.gosperApproximation(number);
    }

    return result.toString();
  }

  gosperApproximation(number) {
    let eulerNumber = 2.7182818284590452353602874713527;
    return (
      (number / eulerNumber) ** number *
      Math.sqrt(Math.PI * (2 * number + 1 / 3))
    );
  }

  executeBasicOperations(obj, ...ops) {
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

        this.removeUsedNumbersAndOperators(obj, i, result);
        i--;
      }
    }

    return result;
  }

  getNumbers(expression) {
    let result = expression
      .split(/(?!^-)(?<![-+/*)])[-+/*]/)
      .filter(x => x)
      .map(x => parseFloat(x));

    return result;
  }

  getOperators(expression) {
    let result = expression.split(/[\d.]+|(?<![\d.])-[\d.]+/).filter(x => x);

    return result;
  }

  balanceParentheses(expression) {
    let missing = 0;

    for (let i = 0, n = expression.length; i < n; i++) {
      if (expression[i] === "(") {
        missing++;
      } else if (expression[i] === ")") {
        missing--;
      }
    }

    // This parenthesis just helps Bracket Pair Colorizer Plugin
    // to work correctly, which was broken because
    // of the next one "("

    return missing > 0 ? expression + ")".repeat(missing) : expression;
  }

  removeUsedNumbersAndOperators(obj, index, result) {
    obj.operators = this.arrayRemoveByIndex(obj.operators, index);

    obj.numbers = obj.numbers
      .slice(0, index)
      .concat(result, obj.numbers.slice(index + 2));

    return obj;
  }

  roundToMaxTenDecimals(number) {
    return Math.round(number * 1e10) / 1e10;
  }

  arrayRemoveByIndex(arr, ...indexes) {
    return arr.filter((elem, index) => !indexes.includes(index));
  }

  removeSpaces() {
    this.expression = this.expression.replace(/\s+/g, "");
    return this;
  }

  replaceFuncNames() {
    this.expression = this.expression.replace("sqrt", "√");
    this.expression = this.expression.replace("cbrt", "∛");
  }

  addParenthesesForRootsAndLogs() {
    this.expression = this.expression.replace(/(√|∛|g)(-?[\d.])+/g, "$1($2)");
  }
};
