import {
  books,
  findBookById,
  addBook,
  updateBook,
  removeBook
} from "../data/books.js";

// GET /books - Жагсаалт авах[cite: 46]
export function list(req, res) {
  res.json({
    count: books.length,
    data: books
  });
}

// GET /books/:id - Нэг ном авах[cite: 46]
export function getOne(req, res) {
  const id = Number(req.params.id);
  const book = findBookById(id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
}

// POST /books - Шинэ ном үүсгэх[cite: 40, 46]
export function create(req, res) {
  const { title, price } = req.body;
  if (!title) {
    return res.status(400).json({ message: "title is required" }); // Validation[cite: 40]
  }
  const book = addBook({ title, price });
  res.status(201).json(book); // 201 Created Status[cite: 40]
}

// PATCH /books/:id - Ном засах[cite: 41, 46]
export function update(req, res) {
  const id = Number(req.params.id);
  const updated = updateBook(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(updated);
}

// DELETE /books/:id - Ном устгах[cite: 42, 46]
export function remove(req, res) {
  const id = Number(req.params.id);
  const ok = removeBook(id);
  if (!ok) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(204).send(); // 204 No Content[cite: 42]
}