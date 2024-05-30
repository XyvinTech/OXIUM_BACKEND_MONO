const vehicleRoute = require("express").Router();
const multer = require("multer");
const {
  imageUploadAlone,
  createVehicle,
  getAllVehicles,
  getAllVehiclesForDashboard,
  getVehicleById,
  getVehiclesByIds,
  updateVehicleById,
  deleteVehicleById,
} = require("../../controllers/vehicle/vehicleController");
const asyncHandler = require("../../utils/asyncHandler");
const upload = multer({ storage: multer.memoryStorage() });

vehicleRoute.post(
  "/image/upload",
  upload.single("image"),
  asyncHandler(imageUploadAlone)
);

// create a new vechicle
vehicleRoute.post("/vehicle/create", asyncHandler(createVehicle));

// get all vechicles
vehicleRoute.get("/vehicle/list", asyncHandler(getAllVehicles));
vehicleRoute.get(
  "/vehicle/dashboard/list",
  asyncHandler(getAllVehiclesForDashboard)
);

// get a vechicle by id
vehicleRoute.get("/vehicle/:id", asyncHandler(getVehicleById));
vehicleRoute.post("/vehicle/getByIds", asyncHandler(getVehiclesByIds));

// update a vechicle by id
vehicleRoute.put("/vehicle/:id", asyncHandler(updateVehicleById));

// delete a vechicle by id
vehicleRoute.delete("/vehicle/:id", asyncHandler(deleteVehicleById));

module.exports = vehicleRoute;
