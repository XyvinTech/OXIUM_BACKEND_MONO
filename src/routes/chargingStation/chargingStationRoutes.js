const csRoute = require("express").Router();
const chargingStationController = require("../../controllers/chargingStation/chargingStationController");
const dashboardController = require("../../controllers/chargingStation/dashboardController");
//image upload
const multer = require("multer");
const asyncHandler = require("../../utils/asyncHandler");
const upload = multer({ storage: multer.memoryStorage() });

//CRUD operations
csRoute.post(
  "/chargingStations/create",
  asyncHandler(chargingStationController.createChargingStation)
);
csRoute.get(
  "/chargingStations/list",
  asyncHandler(chargingStationController.getChargingStationList)
);
csRoute.post(
  "/chargingStations/:chargingStationId",
  asyncHandler(chargingStationController.getChargingStationById)
);
csRoute.put(
  "/chargingStations/:chargingStationId",
  asyncHandler(chargingStationController.updateChargingStation)
);
csRoute.delete(
  "/chargingStations/:chargingStationId",
  asyncHandler(chargingStationController.deleteChargingStation)
);

csRoute.post(
  "/chargingStations/favorite/list",
  asyncHandler(chargingStationController.getFavoriteChargingStationList)
);
csRoute.post(
  "/chargingStations/nearby/list",
  asyncHandler(chargingStationController.getChargingStationUpdatedList)
);
csRoute.post(
  "/chargingStations/list/byName",
  asyncHandler(chargingStationController.getChargingStationListByName)
);

//dashboard
csRoute.get(
  "/chargingStations/dashboard/list",
  asyncHandler(dashboardController.getChargingStationListForDashboard)
);
csRoute.get(
  "/chargingStations/dashboard/list/dropdown",
  asyncHandler(dashboardController.getChargingStationListForDropdown)
);
csRoute.get(
  "/chargingStations/dashboard/evMachineList",
  asyncHandler(dashboardController.getChargingStationEvMachineList)
);
csRoute.get(
  "/chargingStations/dashboard/:chargingStationId",
  asyncHandler(dashboardController.getChargingStationByIdForDashboard)
);
csRoute.get(
  "/chargingStations/dashboard/evMachineList/:chargingStationId",
  asyncHandler(dashboardController.getCPIDListByChargingStationForDashboard)
);

// Image Uploads
csRoute.post(
  "/image/upload",
  upload.single("image"),
  asyncHandler(dashboardController.imageUpload)
);

csRoute.post(
  "/chargingStations/inbetween-points/list",
  asyncHandler(chargingStationController.inbetweenPointsList)
);

module.exports = csRoute;
