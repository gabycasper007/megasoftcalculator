const HistoryModel = require("../models/history");
const Now = require("../Now");

module.exports.save = async (req, res, next) => {
  try {
    const history = new HistoryModel({ ...req.body });
    await history.save();

    res.status(201).json({
      message: "Successfully saved in the database",
      history
    });
  } catch (error) {
    next(addStatusCode(error));
  }
};

module.exports.get = async (req, res, next) => {
  try {
    let report = 0;
    if (req.query.report === "monthly") {
      report = Now.getFirstDayOfMonth();
    } else if (req.query.report === "weekly") {
      report = Now.getLastMonday();
    } else if (req.query.report === "daily") {
      report = Now.getStartOfDay();
    }
    const histories = await HistoryModel.find()
      .where("date_added")
      .gt(report);
    res.status(200).json(histories);
  } catch (error) {
    next(addStatusCode(error));
  }
};

const addStatusCode = error => {
  if (!error.statusCode) {
    error.statusCode = 500;
  }
  return error;
};
