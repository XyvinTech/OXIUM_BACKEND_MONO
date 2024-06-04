const createError = require("http-errors");
const USER = require("../../models/userSchema");

// Get charging tariff by ID
exports.getChargingTariffByRfid = async (req, res) => {
  const idOrRfid = req.params.rfId;
  let chargingTariffApiResult = {};
  //TODO: need to change this code
  const configurationServiceUrl = process.env.CONFIG_SERVICE_URL;
  if (!configurationServiceUrl)
    return res
      .status(400)
      .json({ status: false, message: "CONFIG_SERVICE_URL not set in env" });

  if (idOrRfid.length == 10) {
    const user = await USER.findOne({ userId: idOrRfid }, "chargingTariff");

    if (user.chargingTariff) {
      let apiResponse = await axios.get(
        `${configurationServiceUrl}/api/v1/chargingTariff/${user.chargingTariff}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      chargingTariffApiResult = apiResponse.data.result;
    }

    res.status(200).json({
      status: true,
      message: "Ok",
      result: {
        _id: user._id,
        chargingTariffTotal: chargingTariffApiResult.total,
        tax: chargingTariffApiResult.tax,
      },
    });
  } else {
    //TODO: need to change this code
    let rfidMongoId = await getRFIDMongoId(idOrRfid);
    if (!rfidMongoId) throw new createError(400, "No Mongo Id");

    let rfidId = rfidMongoId._id;
    const user = await USER.findOne({ rfidTag: rfidId }, "chargingTariff");
    if (!user) throw new createError(400, "rfid not found");

    if (user.chargingTariff) {
      //TODO: need to change this code

      let apiResponse = await axios.get(
        `${configurationServiceUrl}/api/v1/chargingTariff/${user.chargingTariff}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      chargingTariffApiResult = apiResponse.data.result;
    }

    res.status(200).json({
      status: true,
      message: "Ok",
      result: {
        _id: user._id,
        chargingTariffTotal: chargingTariffApiResult.total,
        tax: chargingTariffApiResult.tax,
      },
    });
  }
};

// add a favorite station

// add money to wallet
exports.addToWallet = async (req, res) => {
  if (!req.body.amount)
    throw new createError(404, `amount is a required field`);
  else if (isNaN(req.body.amount) || req.body.amount == 0)
    throw new createError(404, `invalid amount`);

  const user = req.params.userId;
  const amount = req.body.amount;
  const doneByAdmin = req.body.doneByAdmin;
  const reference = req.body.reference;
  const actionType = req.body.type;

  const updatedUser = await USER.findByIdAndUpdate(
    user,
    { $inc: { wallet: amount } },
    { new: true }
  );
  if (!updatedUser) {
    res.status(404).json({ status: false, message: "User not found" });
  } else {
    if (doneByAdmin) {
      updateWalletTransaction(user, amount, reference, actionType);
    }

    res.status(200).json({ status: true, message: "Ok", result: updatedUser });
  }
};

// deduct money from wallet
exports.deductFromWallet = async (req, res) => {
  //TODO: need to change this code
  const minimumWalletRequirement = await getConfigValue(
    "minimum-wallet-requirement"
  );

  if (!req.body.amount)
    throw new createError(404, `amount is a required field`);
  else if (isNaN(req.body.amount) || req.body.amount <= 0)
    throw new createError(404, `invalid amount`);

  const userId = req.params.userId;
  const amount = req.body.amount;
  const unitsUsed = req.body.unitsUsed;
  const doneByAdmin = req.body.doneByAdmin;
  const reference = req.body.reference;

  const user = await USER.findById(userId, "wallet");
  if (!user) res.status(404).json({ status: false, message: "User not found" });

  let walletAmount = user.wallet;
  if (walletAmount < Number(amount) + Number(minimumWalletRequirement))
    throw new createError(404, `amount exceeds remaining wallet amount`);

  let newWalletAmount = walletAmount - amount;
  let updateBody = {
    $set: { wallet: newWalletAmount },
  };
  if (unitsUsed) updateBody["$inc"] = { total_units: unitsUsed };

  const updatedUser = await USER.findByIdAndUpdate(userId, updateBody, {
    new: true,
  });

  if (doneByAdmin && updatedUser) {
    //TODO: need to change this code
    updateWalletTransaction(user, amount, reference, "admin deduction");
  }

  res.status(200).json({
    status: true,
    message: "Ok",
    result: { walletAmount: updatedUser.wallet },
  });
};

// Update a user sessions and units
exports.userUpdateSession = async (req, res) => {
  const { userId, unitsConsumed } = req.body;

  const updatedUser = await USER.findByIdAndUpdate(
    userId,
    {
      $inc: {
        // total_units: unitsConsumed,
        total_sessions: 1,
      },
    },
    { new: true }
  );
  if (!updatedUser) {
    res.status(404).json({ status: false, message: "User not found" });
  } else {
    res.status(200).json({ status: true, message: "Ok", result: updatedUser });
  }
};
