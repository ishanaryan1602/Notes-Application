const express = require("express");
const {
  testRoute,
  getUserFromUserId,
  updateUserFromUserId,
  deleteUserFromUserId,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/test", testRoute);
router.get("/:id", getUserFromUserId);
router.put("/:id", updateUserFromUserId);
router.delete("/:id", deleteUserFromUserId);

module.exports = router;
