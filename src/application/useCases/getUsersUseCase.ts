import { User } from "../../domain/models/User";

export const mapUsers = (users: { id: string; name: string }[]): User[] =>
  users.map((user) => ({
    id: user.id,
    name: user.name,
  }));
