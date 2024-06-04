const createError = require("http-errors");
const USER = require("../../models/userSchema");

exports.addFavoriteStation = async (req, res) => {
  if (!req.body.favoriteStation)
    throw new createError(404, `favoriteStation is a required field`);

  const favoriteStation = req.body.favoriteStation;
  const updatedUser = await USER.findByIdAndUpdate(
    req.params.userId,
    { $addToSet: { favoriteStations: favoriteStation } },
    { new: true }
  );
  if (!updatedUser) {
    res.status(404).json({ status: false, message: "User not found" });
  } else {
    res.status(200).json({ status: true, message: "Ok", result: updatedUser });
  }
};

// remove a favorite station
exports.removeFavoriteStation = async (req, res) => {
  if (!req.body.favoriteStation)
    throw new createError(404, `favoriteStation is a required field`);

  const favoriteStation = req.body.favoriteStation;
  const updatedUser = await USER.findByIdAndUpdate(
    req.params.userId,
    { $pull: { favoriteStations: favoriteStation } },
    { new: true }
  );
  if (!updatedUser) {
    res.status(404).json({ status: false, message: "User not found" });
  } else {
    res.status(200).json({ status: true, message: "Ok", result: updatedUser });
  }
};
