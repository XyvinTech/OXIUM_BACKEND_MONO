const createError = require("http-errors");
const USER = require("../../models/userSchema");
const { getVehiclesByIds } = require("../vehicle/vehicleController");

// Get user's vehicles
exports.getUserVehicles = async (req, res) => {
  const vehicleServiceUrl = process.env.VEHICLE_SERVICE_URL;
  if (!vehicleServiceUrl)
    return res
      .status(400)
      .json({ status: false, message: "VEHICLE_SERVICE_URL not set in env" });

  const user = await USER.findOne(
    { _id: req.params.userId },
    "vehicle defaultVehicle"
  );
  if (!user)
    return res.status(404).json({ status: false, message: "User not found" });
  req.body.idArray = user.vehicle.map((vehicle) => vehicle.vehicleRef);
  let apiResponse = await getVehiclesByIds(req, res, true);
  const vehiclesResult = apiResponse;
  const userDefaultVehicle = user.defaultVehicle || null;

  let result = user.vehicle.map((vehicle) => {
    let vehicleFound = vehiclesResult.find(
      (x) => x._id.toString() === vehicle?.vehicleRef?.toString()
    );

    return {
      _id: vehicle._id,
      evRegNumber: vehicle.evRegNumber,
      icon: vehicleFound && vehicleFound.icon ? vehicleFound.icon : "",
      modelName:
        vehicleFound && vehicleFound.modelName ? vehicleFound.modelName : "",
      brand: vehicleFound && vehicleFound.brand ? vehicleFound.brand : "",
      compactable_port:
        vehicleFound && vehicleFound.compactable_port
          ? vehicleFound.compactable_port
          : [],
      defaultVehicle: vehicle.evRegNumber === userDefaultVehicle ? true : false,
    };
  });

  res.status(200).json({ status: true, message: "Ok", result: result });
};

// Update a user by ID
exports.updateUserDefaultVehicle = async (req, res) => {
  const vehicleId = req.body.vehicleId;
  if (!vehicleId) throw new createError(400, "vehicleId is required");

  const updatedUser = await USER.findByIdAndUpdate(
    req.params.userId,
    {
      $set: {
        defaultVehicle: vehicleId,
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

// add vehicle
exports.addVehicle = async (req, res) => {
  if (!req.body.vehicleId)
    throw new createError(404, `vehicleId is a required field`);
  else if (!req.body.evRegNumber)
    throw new createError(404, `evRegNumber is a required field`);

  const vehicleId = req.body.vehicleId;
  const evRegNumber = req.body.evRegNumber;

  const user = await USER.findById(req.params.userId, "vehicle");
  if (!user)
    return res.status(404).json({ status: false, message: "User not found" });

  let evRegNumberFound = user.vehicle
    ? user.vehicle.find((x) => x.evRegNumber === evRegNumber)
    : null;
  if (evRegNumberFound)
    throw new createError(404, `duplicate evRegNumber found`);

  const updatedUser = await USER.findByIdAndUpdate(
    req.params.userId,
    {
      $addToSet: {
        vehicle: { evRegNumber: evRegNumber, vehicleRef: vehicleId },
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

// remove vehicle
exports.removeVehicle = async (req, res) => {
  if (!req.body.evRegNumber)
    throw new createError(404, `evRegNumber is a required field`);

  const evRegNumber = req.body.evRegNumber;

  const user = await USER.findById(req.params.userId, "vehicle");
  const vehicleArray = user.vehicle || [];
  const indexToRemove = vehicleArray.findIndex(
    (x) => x.evRegNumber === evRegNumber
  );
  if (indexToRemove === -1)
    throw new createError(404, `evRegNumber no not found`);

  vehicleArray.splice(indexToRemove, 1);

  const updatedUser = await USER.findByIdAndUpdate(
    req.params.userId,
    { $set: { vehicle: vehicleArray } },
    { new: true }
  );
  if (!updatedUser) {
    res.status(404).json({ status: false, message: "User not found" });
  } else {
    res.status(200).json({ status: true, message: "Ok", result: updatedUser });
  }
};
