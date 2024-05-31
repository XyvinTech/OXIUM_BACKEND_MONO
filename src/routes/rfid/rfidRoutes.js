const rfidRoute = require("express").Router();
const {
  createRfid,
  createManyRfid,
  getRfids,
  getUnassignedRfids,
  getRfid,
  getRfidBySerialNumber,
  updateRfid,
  deleteRfid,
} = require("../../controllers/rfid/rfidController");
const asyncHandler = require("../../utils/asyncHandler");

// create rfid
rfidRoute.post("/rfid/create", asyncHandler(createRfid));
// create rfid
rfidRoute.post("/rfid/createMany", asyncHandler(createManyRfid));

// get all rfids
rfidRoute.get("/rfid/list", asyncHandler(getRfids));
rfidRoute.get("/rfid/unassignedList", asyncHandler(getUnassignedRfids));

// get rfid by id
rfidRoute.get("/rfid/:id", asyncHandler(getRfid));

// get rfid by serial number
rfidRoute.get(
  "/rfid/rfidbySerialNumber/:rfidSerialNumber",
  asyncHandler(getRfidBySerialNumber)
);

// update rfid
rfidRoute.put("/rfid/:id", asyncHandler(updateRfid));

// delete rfid
rfidRoute.delete("/rfid/:id", asyncHandler(deleteRfid));

module.exports = rfidRoute;
