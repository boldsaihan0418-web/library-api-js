// 1. Номын массив (Data)
export const books = [
  { id: 1, title: "Node.js Basics", price: 45000, isAvailable: true },
  { id: 2, title: "Express Deep Dive", price: 52000, isAvailable: true },
  { id: 3, title: "Prisma Essentials", price: 61000, isAvailable: false }
];

// 2. Хайлтын функц (гарчигаар хайх - том, жижиг үсэг харгалзахгүй)
export function searchByTitle(keyword) {
  return books.filter((book) =>
    book.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

// 3. ID-гаар ном олох функц
export function findBookById(id) {
  return books.find((book) => book.id === id);
}

// 4. Бэлэн байгаа номын тоог тоолох
export function countAvailable() {
  return books.filter((b) => b.isAvailable).length;
}

// 5. Өгөгдлийн санг дүрсэлсэн Promise (500ms хүлээлгэнэ)
export function getBooksFromDb() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 500);
  });
}

// 6. Ном олдохгүй бол Алдаа (Error) шидэх функц
export function getBookOrThrow(id) {
  const book = findBookById(id);
  if (!book) {
    throw new Error("Book not found");
  }
  return book;
}