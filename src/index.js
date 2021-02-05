import express from "express";
import router from "./routes.js";
import path from "path";

const app = express();

app.use(express.static(path.resolve("src", "public")));
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "public"));
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`running at http://localhost:${PORT}`));
