import {
  users,
  findUserById,
  findByEmail,
  addUser,
  updateUser,
  removeUser
} from "../data/users.js";

// Нууц үгийг хасаж буцаах туслах функц
function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export function list(req, res) {
  res.json({ count: users.length, data: users.map(sanitizeUser) });
}

export function getOne(req, res) {
  const user = findUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(sanitizeUser(user));
}

export function create(req, res) {
  const { email, name, role, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  if (findByEmail(email)) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const user = addUser({ email, name, role, password });
  res.status(201).json(sanitizeUser(user));
}

export function update(req, res) {
  const updated = updateUser(Number(req.params.id), req.body);
  if (!updated) return res.status(404).json({ message: "User not found" });
  res.json(sanitizeUser(updated));
}

export function remove(req, res) {
  const ok = removeUser(Number(req.params.id));
  if (!ok) return res.status(404).json({ message: "User not found" });
  res.status(204).send();
}