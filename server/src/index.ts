import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { googleRouter } from "./Auth/googleAuth";
import { outlookRouter } from "./Auth/outlookAuth";

dotenv.config();

const app: express.Application = express();
const corsOptions: cors.CorsOptions = {
  origin: [],
  methods: "*",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/", googleRouter);
app.use("/", outlookRouter);

app.get("/", (req, res) => {
  res.send(`
        Welcome to the Demo!<br>
        Please Check my  <a href="https://tejasnayak.tech" target="_blank">portfolio </a>for further information ;).
      `);
});

const port = process.env.PORT;
app.listen(Number(process.env.PORT), () => {
  console.log(`Server running on port ${port}, http://localhost:${port}`);
});
