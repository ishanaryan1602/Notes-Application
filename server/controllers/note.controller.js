const asyncHanlder = require("../middleware/asyncHandler");
const Note = require("../models/note.model");

const testRoute = (req, res) => {
  res.send("note testing route");
};

const getAllNotes = asyncHanlder(async (req, res, next) => {
  try {
    const notes = await Note.find({});
    return res.status(200).json({
      success: true,
      message: "All notes retreived succesfully",
      allNotes: notes,
    });
  } catch (error) {
    return next(error);
  }
});

const createNote = asyncHanlder(async (req, res, next) => {
  const { title, description, priority } = req.body;

  if (!title || !description) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }

  if (priority) {
    if (!["high", "mid", "low"].includes(priority)) {
      const error = new Error("Invalid Priority field");
      error.statusCode = 400;
      return next(error);
    }
  }

  try {
    const newNote = new Note({
      title,
      description,
      priority,
    });
    await newNote.save();
    return res.status(200).json({
      success: true,
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    return next(error);
  }
});

const updateNote = asyncHanlder(async (req, res, next) => {
  const noteId = req.params.id;
  const { title, description, priority } = req.body;
  try {
    const updates = {};

    if (title) updates.title = title;
    if (description) updates.description = description;
    if (priority) {
      if (!["high", "mid", "low"].includes(priority)) {
        const error = new Error("Invalid Priority field");
        error.statusCode = 400;
        return next(error);
      }
      updates.priority = priority;
    }

    const noteExists = await Note.findById(noteId);

    if (!noteExists) {
      const error = new Error("No such note exits");
      error.statusCode = 404;
      return next(error);
    }

    if (!title && !description && !priority) {
      const error = new Error("No fields were updated");
      error.statusCode = 400;
      return next(error);
    }

    const updateNote = await Note.findByIdAndUpdate(
      noteId,
      { $set: updates },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Note updated succesfully",
      note: updateNote,
    });
  } catch (error) {
    return next(error);
  }
});

const deleteNote = asyncHanlder(async (req, res, next) => {
  const noteId = req.params.id;
  try {
    const noteExists = await Note.findById(noteId);
    if (!noteExists) {
      const error = new Error("Note does not exist");
      error.statusCode = 404;
      return next(error);
    }
    await Note.findByIdAndDelete(noteId);
    return res.status(200).json({
      success: true,
      message: "Note deleted succesfully",
    });
  } catch (error) {
    return next(error);
  }
});

const getNoteFromId = asyncHanlder(async (req, res, next) => {
  const noteId = req.params.id;
  try {
    const findNote = await Note.findById(noteId);
    if (!findNote) {
      const error = new Error("Note not found!");
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      note: findNote
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = {
  testRoute,
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteFromId,
};
