import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path'; // Import required functions from the path module
const app = express();
import cors from "cors";
import databaseConnect from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

databaseConnect();
app.use(express.json());
app.use(cors());
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Use __dirname to construct paths
app.use(express.static(join(__dirname, "client/dist")));
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "client/dist/index.html"));
});

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`server is running on port :${port}`);
});
