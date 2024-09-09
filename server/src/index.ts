import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: express.Application = express();
const corsOptions: cors.CorsOptions = {
  origin: [process.env.DEV_CLIENT],
  methods: "*",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

const port = process.env.PORT;
app.listen(Number(process.env.PORT), () => {
  console.log(`Server running on port ${port}, http://localhost:${port}`);
});
