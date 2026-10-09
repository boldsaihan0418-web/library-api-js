import express from "express";
import {
  books,
  searchByTitle,
  findBookById,
  getBooksFromDb,
  getBookOrThrow
} from "./books.js";
import {
  users,
  findUserById,
  findByEmail,
  countAdmins
} from "./users.js";

const app = express();
const PORT = 3000;

// Үндсэн route
app.get("/", (req, res) => {
  res.json({ message: "Library API", version: "2.0.0" });
});

// Health route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

// ==================== BOOKS ROUTES ====================

// 1. БҮХ НОМЫГ АВАХ БОЛОН ХАЙЛТ (Async / Query params)
app.get("/books", async (req, res) => {
  const q = req.query.q;

  if (q) {
    return res.json(searchByTitle(q));
  }

  const allBooks = await getBooksFromDb();
  res.json(allBooks);
});

// 2. НЭГ НОМЫГ ID-ГААР АВАХ (Async / Params + Try-Catch алдаа барих)
app.get("/books/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = getBookOrThrow(id);
    res.json(book);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// ==================== USERS ROUTES ====================

// 3. БҮХ ХЭРЭГЛЭГЧДИЙГ АВАХ (Нууц үгийг хасаж буцаана)
app.get("/users", (req, res) => {
  const safeUsers = users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  res.json(safeUsers);
});

// 4. НЭГ ХЭРЭГЛЭГЧИЙГ ID-ГААР АВАХ (404 шалгалт болон Rest operator-оор password хасна)
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Rest operator ашиглан password-ийг хасаж байна
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

// Сервер ажиллуулах
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});