const Expression = require("../Expression").default;

module.exports.send = (req, res, next) => {
  try {
    let expression = new Expression(req.body.expression);
    res.json(expression.calculate());
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
