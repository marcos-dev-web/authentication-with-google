import { Router } from "express";
import verify from './auth/googleVerify.js';

const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/gettoken", async (req, res) => {
  let token = req.body['idtoken'];
  verify(token).then(() => {
    res.cookie('session-token', token);
    res.send({
      logged: true
    })
  }).catch((err) => {
    res.status(500).send({
      logged: false
    }).end();
  })
});

export default router;
