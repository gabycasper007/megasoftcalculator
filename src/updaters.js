import * as helper from "./helper.js";

const setOperation = (state, operation) => {
  let expression = state.expression;
  let decimals = state.decimals;

  if (expression === "0" && operation === "-") {
    expression = "-";
  } else if (
    ![".", "(", "-"].includes(helper.getLastCharacter(state.expression)) ||
    (state.expression.endsWith("-") &&
      state.expression !== "-" &&
      helper.getCharBeforeLastChar(state.expression) !== "(")
  ) {
    expression =
      (state.operation
        ? helper.removeLastCharacter(state.expression)
        : state.expression) + operation;
    decimals = false;
  } else if (state.expression.endsWith("(") && operation === "-") {
    expression = state.expression + operation;
  }
  return {
    ...state,
    expression,
    operation,
    decimals
  };
};

const setDigit = (state, digit) => {
  let expression = state.expression;
  let doesntHaveDecimalsAndDoesntStartWithZero =
    !helper.hasDecimals(digit) && !helper.startsWithZero(expression);

  if (expression === "0") {
    if (digit === "0") {
      expression = "0";
    } else {
      expression = digit;
    }
  } else if (expression.endsWith("!")) {
    expression += "*" + digit;
  } else if (digit === "0") {
    if (
      helper.hasDecimals(expression) ||
      doesntHaveDecimalsAndDoesntStartWithZero
    ) {
      expression += digit;
    }
  } else {
    if (expression.endsWith("0")) {
      expression = helper.removeLastCharacter(expression);
    }
    expression += digit;
  }

  return {
    ...state,
    expression,
    operation: ""
  };
};

const reset = state => {
  return {
    ...helper.initialState,
    keyboardActive: state.keyboardActive
  };
};

const setDecimalsSeparator = state => {
  if (state.expression.endsWith("!")) {
    state.expression += "*";
  }
  return {
    ...state,
    expression: state.decimals
      ? state.expression
      : state.expression === "0"
      ? "."
      : state.expression + ".",
    decimals: true
  };
};

const setRootOrLog = (state, operationType) => {
  if (state.expression.endsWith(".")) {
    state.expression = helper.removeLastCharacter(state.expression);
    state.decimals = false;
  }
  if (helper.isDigit(helper.getLastCharacter(state.expression))) {
    state.expression += "*";
  }
  return {
    ...state,
    expression:
      state.expression === "0"
        ? operationType + "("
        : state.expression + operationType + "(",
    parentheses: {
      ...state.parentheses,
      opened: state.parentheses.opened + 1
    }
  };
};

const setFactorialOrPower = (state, operationType) => {
  if (state.expression.endsWith(".")) {
    state.expression = helper.removeLastCharacter(state.expression);
    state.decimals = false;
  }
  if (helper.isLastCharacterASign(state.expression)) {
    state.expression = helper.removeLastCharacter(state.expression);
  }
  return {
    ...state,
    expression: state.expression ? state.expression + operationType : "0"
  };
};

const openParenthesis = state => {
  if (state.expression.endsWith(".")) {
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
};

const closeParenthesis = state => {
  if (
    state.expression.endsWith(".") ||
    helper.isOperation(helper.getLastCharacter(state.expression))
  ) {
    state.expression = helper.removeLastCharacter(state.expression);
  }

  return {
    parentheses: {
      ...state.parentheses,
      closed: state.parentheses.closed + 1
    },
    expression: state.expression + ")"
  };
};

const back = state => {
  const last = helper.getLastCharacter(state.expression);

  let newState = {
    ...state
  };

  if (state.expression.length === 1) {
    newState = { ...helper.initialState };
  } else {
    newState.expression = helper.removeLastCharacter(newState.expression);
    const newLast = helper.getLastCharacter(newState.expression);

    if (helper.isOperation(last)) {
      newState.operation = "";
    } else if (last === ".") {
      newState.decimals = false;
    } else if (last === ")") {
      newState.parentheses.closed = newState.parentheses.closed - 1;
    } else if (helper.isDigit(last) && helper.isOperation(newLast)) {
      newState.operation = newLast;
    } else if (last === "(") {
      newState.parentheses.opened = newState.parentheses.opened - 1;

      if (newLast === "√" || newLast === "∛") {
        newState.expression = helper.removeLastCharacter(newState.expression);
      } else if (newLast === "g") {
        newState.expression = newState.expression.slice(
          0,
          newState.expression.length - 3
        );
      }

      if (newState.expression === "") {
        newState.expression = "0";
      }
    }

    if (helper.hasDecimals(newState.expression)) {
      newState.decimals = true;
    }
  }

  return newState;
};

export {
  setOperation,
  setDigit,
  reset,
  setDecimalsSeparator,
  setRootOrLog,
  setFactorialOrPower,
  openParenthesis,
  closeParenthesis,
  back
};
