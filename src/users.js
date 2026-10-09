// Хэрэглэгчдийн өгөгдөл
export const users = [
  { id: 1, name: "Bat", email: "bat@example.com", role: "ADMIN", password: "secretPassword1" },
  { id: 2, name: "Sarnai", email: "sarnai@example.com", role: "USER", password: "secretPassword2" },
  { id: 3, name: "Tuguldur", email: "tuguldur@example.com", role: "USER", password: "secretPassword3" },
  { id: 4, name: "Anu", email: "anu@example.com", role: "ADMIN", password: "secretPassword4" }
];

// ID-гаар хэрэглэгч олох
export function findUserById(id) {
  return users.find((user) => user.id === id);
}

// Имэйлээр хэрэглэгч олох
export function findByEmail(email) {
  return users.find((user) => user.email === email);
}

// Админ хэрэглэгчдийг тоолох
export function countAdmins() {
  return users.filter((user) => user.role === "ADMIN").length;
}