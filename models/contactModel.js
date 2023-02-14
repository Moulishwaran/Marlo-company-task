const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String },
  dob: { type: Date },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  occupation: { type: String },
  company: { type: String },
  password: { type: String, required: true },
});

module.exports = mongoose.model("Contact", contactSchema);
