require("dotenv").config();

const axios = require("axios");
const crypto = require("crypto");



async function verifyEsewaPayment(encodedData) {
  try {
    const decodedData = JSON.parse(atob(encodedData)); // Decode and parse base64 data
    const secretKey = process.env.ESEWA_SECRET_KEY;

    const data = `transaction_code=${decodedData.transaction_code},status=${decodedData.status},total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;

    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    console.log("Verification Signed Fields:", data);
    console.log("Verification Signature:", hash);
    console.log("Received Signature:", decodedData.signature);

    if (hash !== decodedData.signature) {
      throw new Error("Invalid signature");
    }

    const reqOptions = {
      url: `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_PRODUCT_CODE}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };

    const response = await axios.request(reqOptions);
    if (
      response.data.status !== "COMPLETE" ||
      response.data.transaction_uuid !== decodedData.transaction_uuid ||
      Number(response.data.total_amount) !== Number(decodedData.total_amount)
    ) {
      throw new Error("Invalid transaction details");
    }

    return { response: response.data, decodedData };
  } catch (error) {
    throw error;
  }
}


module.exports = { verifyEsewaPayment };