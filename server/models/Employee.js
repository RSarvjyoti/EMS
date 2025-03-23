const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String, 
      default: null,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

module.exports = Employee;
