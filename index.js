import express from "express";
import crypto from "crypto";

const app = express();
app.use(express.json());

const users = [];

app.get("/api/user", (request, response) => {
  return response.json(users);
});

app.get("/api/user/:id", (request, response) => {
  const user = users.find((user) => user.id === request.params.id);

  if (!user) {
    return response.status(404).json({ message: "user not found!" });
  }

  return response.json(user);
});

app.post("/api/user", (request, response) => {
  const { name, email } = request.body;
  const user = { id: crypto.randomUUID(), name, email };

  users.push(user);

  return response.status(201).json(user);
});

app.put("/api/user/:id", (request, response) => {
  const { name, email } = request.body;
  const user = users.find((user) => user.id === request.params.id);

  if (!user) {
    return response.status(404).json({ message: "user not found!" });
  }

  name && (user.name = name);
  email && (user.email = email);

  return response.json(user);
});

app.delete("/api/user/:id", (request, response) => {
  const userIndex = users.findIndex((user) => user.id === request.params.id);
  console.log(userIndex);

  if (userIndex < 0) {
    return response.status(404).json({ message: "user not found!" });
  }

  const user = users.splice(userIndex, 1);

  return response.json({ user: user[0] });
});

app.listen("3333", () => {
  console.log("🔥 Server running on port 3333!");
});
