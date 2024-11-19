import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/note.routes.js";
import { swaggerSpec, swaggerUi } from "./docs/swagger.js"; // Import Swagger setup
dotenv.config();
import connection from "./config/db.js";
connection();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI at /api-docs

// Routes
app.use("/user", userRouter);
app.use("/note", noteRouter);

// Basic route for testing
app.get("/", (req, res) => {
  res.send({
    message: "API is working.",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
