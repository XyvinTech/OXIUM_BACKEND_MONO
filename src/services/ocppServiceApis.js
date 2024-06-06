require("dotenv").config();
const axios = require("axios");
const generateToken = require("../utils/generateToken");

const staticGlobalUrl = "http://localhost:6500";

const token = generateToken(process.env.AUTH_SECRET);

exports.getSoC = async (cpid, connectorId) => {
  try {
    let ocppServiceUrl = process.env.OCPP_SERVICE_URL;
    if (!ocppServiceUrl) ocppServiceUrl = staticGlobalUrl;
    const response = await axios.get(
      `${ocppServiceUrl}/api/v1/ocpp/getOcpp/${cpid}/${connectorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.result;
  } catch (error) {
    console.error("Error fetching rating:", error);
    return null;
  }
};
