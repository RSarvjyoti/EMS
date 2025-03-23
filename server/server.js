const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 9080;

connectDB(DB_URL);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.get('/', (req, res) => {
    res.send("<h1>Welcome to the EMS.This is a home route.</h2>")
})

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
