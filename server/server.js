import Pusher from "pusher";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: "ap2",
  useTLS: true,
});

app.set("PORT", process.env.PORT || 5000);

// get all todos
app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

// add new todo
app.post("/todos", async (req, res) => {
  const newTodo = await prisma.todo.create({
    data: {
      task: req.body.task,
      completed: false,
    },
  });
  pusher.trigger("todos", "inserted", newTodo);
  res.json(newTodo);
});

// update todo
app.put("/todos/:id", async (req, res) => {
  const updatedTodo = await prisma.todo.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      task: req.body.task,
      completed: req.body.completed,
    },
  });
  pusher.trigger("todos", "updated", updatedTodo);
  res.json(updatedTodo);
});

// delete todo
app.delete("/todos/:id", async (req, res) => {
  const deletedTodo = await prisma.todo.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  pusher.trigger("todos", "deleted", deletedTodo);
  res.json(deletedTodo);
});

app.post("/message", (req, res) => {
  const payload = req.body;
  pusher.trigger("chat", "message", payload);
  res.send(payload);
});

app.listen(app.get("PORT"), () =>
  console.log("Listening at " + app.get("PORT"))
);
