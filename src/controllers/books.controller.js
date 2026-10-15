import {
  books,
  findBookById,
  addBook,
  updateBook,
  removeBook,
  searchByTitle
} from "../data/books.js";

// 1. list гэж EXPORT хийсэн байх ёстой
export function list(req, res) {
  res.json({ count: books.length, data: books });
}

// 2. search гэж EXPORT хийсэн байх ёстой
export function search(req, res) {
  const q = req.query.q;
  if (!q) return res.json(books);
  const results = searchByTitle(q);
  res.json(results);
}

// 3. getOne гэж EXPORT хийсэн байх ёстой[cite: 46, 49]
export function getOne(req, res) {
  const id = Number(req.params.id);
  const book = findBookById(id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
}

// 4. create[cite: 46, 49]
export function create(req, res) {
  const { title, price } = req.body;
  if (!title) return res.status(400).json({ message: "title is required" });
  const book = addBook({ title, price });
  res.status(201).json(book);
}

// 5. update[cite: 46, 49]
export function update(req, res) {
  const id = Number(req.params.id);
  const updated = updateBook(id, req.body);
  if (!updated) return res.status(404).json({ message: "Book not found" });
  res.json(updated);
}

// 6. remove[cite: 46, 49]
export function remove(req, res) {
  const id = Number(req.params.id);
  const ok = removeBook(id);
  if (!ok) return res.status(404).json({ message: "Book not found" });
  res.status(204).send();
}