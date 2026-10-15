import express from "express";
import booksRouter from "./routes/books.router.js";
import usersRouter from "./routes/users.router.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Library API", version: "1.0.0" });
});

app.use(express.json());
app.use(logger);

app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
g
app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);
});