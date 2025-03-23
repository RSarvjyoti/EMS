const Employee = require("../models/Employee");

exports.createEmployee = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, position, contact } = req.body;
    const profilePic = req.file ? req.file.path : null;

    const newEmployee = new Employee({ name, position, contact, profilePic });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error("Error in createEmployee:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = "" } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const employees = await Employee.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const count = await Employee.countDocuments(query);
    res.json({ employees, total: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
