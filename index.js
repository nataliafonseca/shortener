import express from "express";

const app = express();

app.get("/", (request, response) => {
  response.json({ message: "hello get" });
});

app.post("/", (request, response) => {
  response.json({ message: "hello post" });
});

app.put("/", (request, response) => {
  response.json({ message: "hello put" });
});

app.delete("/", (request, response) => {
  response.json({ message: "hello delete" });
});

app.listen("3333", () => {
  console.log("🔥 Server running on port 3333!");
});
