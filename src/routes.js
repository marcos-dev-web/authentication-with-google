import { Router } from "express";
import { verify, checkAuthenticated } from "./auth/middlewares.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", checkAuthenticated, (req, res) => {
  let user = req.user;
  res.render("profile", { user });
});

router.post("/gettoken", async (req, res) => {
  let token = req.body["idtoken"];
  verify(token)
    .then(() => {
      res.cookie("session-token", token);
      res.send("success");
    })
    .catch((err) => {
      res.send("error");
    });
});

router.post("/loged", checkAuthenticated, (req, res) => {
  res.send("success");
});

export default router;
