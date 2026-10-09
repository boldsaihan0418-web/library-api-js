export const users = [
  { id: 1, name: "Bat", email: "bat@example.com", role: "ADMIN", password: "123" },
  { id: 2, name: "Sarnai", email: "sarnai@example.com", role: "USER", password: "456" }
];

let nextUserId = 3;

export function findUserById(id) {
  return users.find((u) => u.id === id);
}

export function findByEmail(email) {
  return users.find((u) => u.email === email);
}

export function addUser(input) {
  const user = { id: nextUserId++, ...input };
  users.push(user);
  return user;
}

export function updateUser(id, changes) {
  const user = findUserById(id);
  if (!user) return null;
  if (changes.id) delete changes.id;
  Object.assign(user, changes);
  return user;
}

export function removeUser(id) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}