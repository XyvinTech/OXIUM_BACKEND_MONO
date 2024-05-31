const brandRouter = require("express").Router();
const {
  createBrand,
  getAllBrands,
  getAllBrandsDropdown,
  updateBrandById,
  deleteBrandById,
} = require("../../controllers/vehicle/brandController");
const asyncHandler = require("../utils/asyncHandler");

brandRouter
  .post("/brand/create", asyncHandler(createBrand))
  .get("/brand/list", asyncHandler(getAllBrands))
  .get("/brand/list/dropdown", asyncHandler(getAllBrandsDropdown))
  .put("/brand/:id", asyncHandler(updateBrandById))
  .delete("/brand/:id", asyncHandler(deleteBrandById));

module.exports = brandRouter;
