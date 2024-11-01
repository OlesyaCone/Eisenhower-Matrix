import express from "express";
import cors from "cors";
import mongoose, { Schema, Document } from "mongoose";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const mongoUri = "mongodb://127.0.0.1:27017/matrix";
mongoose
  .connect(mongoUri)
  .then(() => console.log("MongoDB подключен"))
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

interface ITask extends Document {
  category: string;
  task: string;
}

let taskSchema = new Schema<ITask>({
  category: { type: String, required: true },
  task: { type: String, required: true },
});

let Matrix = mongoose.model<ITask>("matrix", taskSchema);

app.get("/taskiau", async function (req, res) {
  let data = await Matrix.find({ category: "iau" });
  res.send(data);
});
app.get("/taskianu", async function (req, res) {
  let data = await Matrix.find({ category: "ianu" });
  res.send(data);
});
app.get("/taskniau", async function (req, res) {
  let data = await Matrix.find({ category: "niau" });
  res.send(data);
});
app.get("/tasknianu", async function (req, res) {
  let data = await Matrix.find({ category: "nianu" });
  res.send(data);
});

app.post("/create", async function(req, res) {
  let {
    category,
    task
  } = req.body ;

  let matrix = new Matrix({
    category,
    task
  });
  await matrix.save();
  res.status(201).send(matrix);
})

app.delete("/task/:id", async function (req, res) {
    let id = req.params.id;
    await Matrix.deleteOne({ _id: id });
    res.sendStatus(200);
});
