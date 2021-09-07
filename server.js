import express from "express";
import mongoose from "mongoose";
import { db_password } from "./constants.js";
import cards from "./dbCards.js";
import cors from "cors";

// App Config
const app = express();
const port = process.env.PORT || 8000;
const connection_url = `mongodb+srv://admin:${db_password}@cluster0.pea9o.mongodb.net/pbinder?retryWrites=true&w=majority`;

// Middleware
app.use(express.json());
app.use(cors());

// DB Config
mongoose.Promise = global.Promise;
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

// API Endpoints
app.get("/", (req, res) => {
  res.status(200).send(`Hello Vamsi!`);
});

app.post("/pbinder/cards", (req, res) => {
  const dbCard = req.body;

  cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/pbinder/cards", (req, res) => {
  cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listener
app.listen(port, () => {
  console.log(`Listening on localhost: ${port}`);
});
