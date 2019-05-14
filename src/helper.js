const operations = ["-", "+", "/", "*"];
const signs = operations.concat([".", "^"]);

exports.initialState = {
  operation: "",
  expression: "0",
  decimals: false,
  keyboardActive: false,
  parentheses: {
    opened: 0,
    closed: 0
  }
};

exports.hasDecimals = s => {
  return ~this.getLastNumber(s).indexOf(".");
};

exports.getLastNumber = s => {
  const split = s.split(/[^\d.]+/);
  return split[split.length - 1];
};

exports.isDigit = s => {
  return ~s.search(/^\d$/);
};

exports.isOperation = s => {
  return operations.includes(s);
};

exports.isDecimalSeparator = s => {
  return s === ".";
};
exports.startsWithZero = s => {
  return this.getLastNumber(s).slice(0, 1) === "0";
};

exports.removeLastCharacter = s => {
  return s.slice(0, -1);
};

const getLastCharacter = s => {
  return s[s.length - 1];
};

exports.getLastCharacter = getLastCharacter;

exports.getCharBeforeLastChar = s => {
  return s[s.length - 2];
};

exports.isLastCharacterASign = s => {
  return signs.includes(getLastCharacter(s));
};
