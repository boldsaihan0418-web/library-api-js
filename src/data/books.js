export const books = [
  { id: 1, title: "Node.js Basics", price: 45000, isAvailable: true },
  { id: 2, title: "Express Deep Dive", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma Essentials", price: 61000, isAvailable: false }
];

let nextId = 4; // Шинэ ном нэмэхэд олгох ID[cite: 40]

export function findBookById(id) {
  return books.find((book) => book.id === id);
}

// 1. Шинэ ном нэмэх (POST)
export function addBook(input) {
  const book = {
    id: nextId++,
    isAvailable: true,
    ...input
  };
  books.push(book);
  return book;
}

// 2. Номын мэдээлэл шинэчлэх (PATCH)
export function updateBook(id, changes) {
  const book = findBookById(id);
  if (!book) return null;

  // ID-г засахаас сэргийлж устгана[cite: 41]
  if (changes.id) delete changes.id;

  Object.assign(book, changes);
  return book;
}

// 3. Ном устгах (DELETE)
export function removeBook(id) {
  const index = books.findIndex((book) => book.id === id);
  if (index === -1) return false;

  books.splice(index, 1);
  return true;
}