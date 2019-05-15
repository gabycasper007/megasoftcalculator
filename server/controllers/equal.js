const Expression = require("../Expression").default;

module.exports.equal = (req, res) => {
  let expression = new Expression(req.body.expression);
  res.json(expression.calculate());
};
