const moment = require("moment");
const Brand = require("../../models/brandSchema");
const createError = require("http-errors");
const mongoose = require("mongoose");

const createBrand = async (req, res) => {
  if (!req.body.brandName)
    throw new createError(400, "brandName field is required");
  let value = req.body;
  const doesExist = await Brand.findOne({ brandName: value.brandName });
  if (doesExist) throw new Error("Already Exist");
  const newBrand = new Brand(req.body);
  const savedBrand = await newBrand.save();
  res.status(201).json({
    status: true,
    message: "OK",
  });
};

// Get all Brands
const getAllBrands = async (req, res) => {
  const { pageNo, searchQuery } = req.query;

  const filter = {};

  if (searchQuery) {
    filter.$or = [{ brandName: { $regex: searchQuery, $options: "i" } }];
  }

  const brands = await Brand.find(filter)
    .skip(10 * (pageNo - 1))
    .limit(10);
  let totalCount = await Brand.find(filter).countDocuments();
  const formattedBrands = brands.map((brand) => ({
    ...brand._doc,
    createdAt: moment(brand.createdAt).format("DD-MM-YYYY "),
  }));
  res.status(200).json({
    status: true,
    message: "OK",
    result: brands,
    totalCount,
  });
};

const getAllBrandsDropdown = async (req, res) => {
  const filter = {};

  const brands = await Brand.find(filter);
  let totalCount = await Brand.find(filter).countDocuments();
  const formattedBrands = brands.map((brand) => ({
    ...brand._doc,
    createdAt: moment(brand.createdAt).format("DD-MM-YYYY "),
  }));
  res.status(200).json({
    status: true,
    message: "OK",
    result: brands,
    totalCount,
  });
};

// Update a Brand by ID
const updateBrandById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new createError(400, `Invalid id ${id}`);
  }

  const updatedBrand = await Brand.findByIdAndUpdate(
    id,
    { brandName: req.body.brandName }, // Assuming brandName is the only field
    { new: true }
  );
  res.status(200).json({
    status: true,
    result: updatedBrand,
  });
};

// Delete a Brand by ID
const deleteBrandById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new createError(400, `Invalid id ${id}`);
  }

  const deletedBrand = await Brand.findByIdAndDelete(id);
  if (!deletedBrand) {
    throw new createError(404, `Brand with id ${id} not found`);
  }

  res.status(204).end();
};

module.exports = {
  createBrand,
  getAllBrands,
  updateBrandById,
  deleteBrandById,
  getAllBrandsDropdown,
};
