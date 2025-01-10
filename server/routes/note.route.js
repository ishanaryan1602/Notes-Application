const express = require("express");
const {
  testRoute,
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNoteFromId,
} = require("../controllers/note.controller");

const router = express.Router();

router.get("/test", testRoute);
router.get("/allNotes", getAllNotes);
router.get("/:id", getNoteFromId);
router.post("/createNote", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
