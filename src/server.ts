import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.info(`server listening at http://${HOST}:${PORT}`);
});
