import express from "express";
import booksRouter from "./routes/books.router.js";
import usersRouter from "./routes/users.router.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();
const PORT = 3000;

// 1. Body Parser Middleware (Заавал хамгийн дээр байна)[cite: 39, 47]
app.use(express.json());

// 2. Custom Logger Middleware[cite: 44, 47]
app.use(logger);

// 3. Router-үүд (Books болон Users)[cite: 47]
app.use("/books", booksRouter);
app.use("/users", usersRouter);

// 4. 404 ба Error Handlers (Заавал хамгийн доор байна)[cite: 47, 48]
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});