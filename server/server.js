const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const DB_URL = process.env.DB_URL;

connectDB(DB_URL);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 9080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
