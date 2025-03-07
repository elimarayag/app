const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPSchema = new Schema({
  email: { type: String, unique: true },
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});

// Properly register the model with the correct name and schema
const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;