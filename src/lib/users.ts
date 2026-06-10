// lib/users.ts
import bcrypt from "bcryptjs";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

// Simulamos una base de datos en memoria
const users: User[] = [];

export async function createUser(name: string, email: string, password: string): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  };
  users.push(newUser);
  return newUser;
}

export async function findUserByEmail(email: string): Promise<User | undefined> {
  return users.find((u) => u.email === email);
}

export async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}