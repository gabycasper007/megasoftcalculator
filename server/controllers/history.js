const HistoryModel = require("../models/history");

module.exports.save = async (req, res, next) => {
  try {
    const history = new HistoryModel({ ...req.body });
    await history.save();

    res.status(201).json({
      message: "Successfully saved in the database",
      history
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
