const LOGS = require("../../models/logSchema");

exports.getLogs = async (req, res) => {
  const { pageNo, searchQuery } = req.query;

  const filter = {};

  if (searchQuery) {
    filter.$or = [{ label: { $regex: searchQuery, $options: "i" } }];
  }
  const totalCount = await LOGS.find(filter).countDocuments();
  const logData = await LOGS.find(filter)
    .skip(10 * (pageNo - 1))
    .limit(10)
    .sort({ timestamp: -1 });
  if (!logData) {
    res.status(404).json({ error: "Log not found" });
  } else {
    res
      .status(200)
      .json({ status: true, message: "OK", result: logData, totalCount });
  }
};
