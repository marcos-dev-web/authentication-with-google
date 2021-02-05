import express from "express";
import router from "./routes.js";
import path from "path";
import bodyParser from "body-parser";
import 'dotenv/config.js';
import cookieParser from "cookie-parser";

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.resolve("src", "public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "public"));
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`running at http://localhost:${PORT}`));
