import { randomUUID } from "crypto";
import { users } from "../model/UserModel.js";

export const controller = {
  index: (request, response) => {
    return response.json(users);
  },

  getOne: (request, response) => {
    const user = users.find((user) => user.id === request.params.id);

    if (!user) {
      return response.status(404).json({ message: "user not found!" });
    }

    return response.json(user);
  },

  store: (request, response) => {
    const { name, email } = request.body;
    const user = { id: randomUUID(), name, email };

    users.push(user);

    return response.status(201).json(user);
  },

  update: (request, response) => {
    const { name, email } = request.body;
    const user = users.find((user) => user.id === request.params.id);

    if (!user) {
      return response.status(404).json({ message: "user not found!" });
    }

    name && (user.name = name);
    email && (user.email = email);

    return response.json(user);
  },

  remove: (request, response) => {
    const userIndex = users.findIndex((user) => user.id === request.params.id);

    if (userIndex < 0) {
      return response.status(404).json({ message: "user not found!" });
    }

    const user = users.splice(userIndex, 1);

    return response.json({ user: user[0] });
  },
};
