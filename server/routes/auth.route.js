const express = require("express");
const {testRoute,register,login, logout} = require('../controllers/auth.controller.js')

const router = express.Router();

router.get("/",testRoute);
router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);

module.exports = { router };

