const { Binary } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Template = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", Template);
