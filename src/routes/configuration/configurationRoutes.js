const configRoute = require("express").Router();
const configurationController = require("../../controllers/configuration/configurationController");
const taxController = require("../../controllers/configuration/taxController");
const chargingTariffController = require("../../controllers/configuration/chargingTariffController");
const asyncHandler = require("../../utils/asyncHandler");

configRoute.post(
  "/config/create",
  asyncHandler(configurationController.addConfigValue)
);
configRoute.get(
  "/config/list",
  asyncHandler(configurationController.getConfigList)
);
configRoute.get(
  "/config/byName/:name",
  asyncHandler(configurationController.getConfigByName)
);

// tax - routes
configRoute.post("/tax/create", asyncHandler(taxController.createTax));
configRoute.get("/tax/list", asyncHandler(taxController.getTaxList));
configRoute.get(
  "/tax/list/dropdown",
  asyncHandler(taxController.getTaxListDropdown)
);
configRoute.get("/tax/:id", asyncHandler(taxController.getTaxById));
configRoute.delete("/tax/:id", asyncHandler(taxController.deleteTax));
configRoute.put("/tax/:id", asyncHandler(taxController.updateTax));

// chargingTariff - routes
configRoute.post(
  "/chargingTariff/create",
  asyncHandler(chargingTariffController.createChargingTariff)
);
configRoute.post(
  "/chargingTariff/createUpdate/default",
  asyncHandler(chargingTariffController.createDefaultChargingTariff)
);
configRoute.get(
  "/chargingTariff/list",
  asyncHandler(chargingTariffController.getChargingTariffList)
);
configRoute.get(
  "/chargingTariff/list/dropdown",
  asyncHandler(chargingTariffController.getChargingTariffListDropdown)
);
configRoute.get(
  "/chargingTariff/default",
  asyncHandler(chargingTariffController.getDefaultChargingTariff)
);
configRoute.get(
  "/chargingTariff/:id",
  asyncHandler(chargingTariffController.getChargingTariffById)
);
configRoute.get(
  "/chargingTariff/getTotalRate/:id",
  asyncHandler(chargingTariffController.getTotalChargingTariffRate)
);
configRoute.delete(
  "/chargingTariff/:id",
  asyncHandler(chargingTariffController.deleteChargingTariff)
);
configRoute.put(
  "/chargingTariff/:id",
  asyncHandler(chargingTariffController.updateChargingTariff)
);

module.exports = configRoute;
