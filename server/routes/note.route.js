const express = require("express");
const {
  testRoute,
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNoteFromId,
} = require("../controllers/note.controller");
const checkCookie = require("../middleware/checkCookie");

const router = express.Router();
//non protected routes
router.get("/test", testRoute);
router.get("/allNotes", getAllNotes);
//protected routes
router.get("/:id", checkCookie, getNoteFromId);
router.post("/createNote", checkCookie, createNote);
router.put("/:id", checkCookie, updateNote);
router.delete("/:id", checkCookie, deleteNote);

module.exports = router;
