const asyncHanlder = require("../middleware/asyncHandler");
const Note = require("../models/note.model");
const User = require("../models/user.model");

const testRoute = (req, res) => {
  res.send("note testing route");
};

const getAllNotes = asyncHanlder(async (req, res, next) => {
  const userId = req.user._id;
  const { priority } = req.query;
  try {
    const user = await User.findById(userId).populate("notes");
    if (!user) {
      const error = new Error("You are not authenticated");
      error.statusCode = 404;
      return next(error);
    }
    const query = priority ? { priority } : {};
    let notes = user.notes;
    if (priority) {
      notes = notes.filter((item) => item.priority === priority);
    }
    if (notes.length === 0) {
      const error = new Error(
        "No notes found. Create some notes to retrieve them."
      );
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({
      success: true,
      message: "All notes retrieved succesfully",
      notes: notes,
    });
  } catch (error) {
    return next(error);
  }
});

const createNote = asyncHanlder(async (req, res, next) => {
  const { title, description, priority, noteColor } = req.body;
  const userId = req.user._id;
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
  if (noteColor) {
    if (
      ![
        "bg-slate-100",
        "bg-gray-100",
        "bg-zinc-100",
        "bg-neutral-100",
        "bg-stone-100",
        "bg-red-100",
        "bg-orange-100",
        "bg-amber-100",
        "bg-yellow-100",
        "bg-lime-100",
        "bg-green-100",
        "bg-emerald-100",
        "bg-teal-100",
        "bg-cyan-100",
        "bg-sky-100",
        "bg-blue-100",
        "bg-indigo-100",
        "bg-violet-100",
        "bg-purple-100",
        "bg-fuchsia-100",
        "bg-pink-100",
        "bg-rose-100",
      ].includes(noteColor)
    ) {
      const error = new Error("Invalid color field");
      error.statusCode = 400;
      return next(error);
    }
  }
  try {
    const user = await User.findById(userId);
    const newNote = new Note({
      title,
      description,
      priority,
      noteColor,
      user_id: userId,
    });
    user.notes.push(newNote._id);
    await user.save();
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
  const userId = req.user._id;
  const { title, description, priority, noteColor } = req.body;
  try {
    const noteExists = await Note.findById(noteId);

    if (!noteExists) {
      const error = new Error("No such note exits");
      error.statusCode = 404;
      return next(error);
    }

    if (noteExists.user_id.toString() !== userId.toString()) {
      const error = new Error("You are not authorized to edit this note");
      error.statusCode = 403;
      return next(error);
    }

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
    if (noteColor) {
      if (
        ![
          "bg-slate-100",
          "bg-gray-100",
          "bg-zinc-100",
          "bg-neutral-100",
          "bg-stone-100",
          "bg-red-100",
          "bg-orange-100",
          "bg-amber-100",
          "bg-yellow-100",
          "bg-lime-100",
          "bg-green-100",
          "bg-emerald-100",
          "bg-teal-100",
          "bg-cyan-100",
          "bg-sky-100",
          "bg-blue-100",
          "bg-indigo-100",
          "bg-violet-100",
          "bg-purple-100",
          "bg-fuchsia-100",
          "bg-pink-100",
          "bg-rose-100",
        ].includes(noteColor)
      ) {
        const error = new Error("Invalid color field");
        error.statusCode = 400;
        return next(error);
      }
      updates.noteColor = noteColor;
    }

    if (!title && !description && !priority && !noteColor) {
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
  const userId = req.user._id;
  try {
    const noteExists = await Note.findById(noteId);
    if (!noteExists) {
      const error = new Error("Note does not exist");
      error.statusCode = 404;
      return next(error);
    }
    if (noteExists.user_id.toString() !== userId.toString()) {
      const error = new Error("You are not authorized to delete this note");
      error.statusCode = 403;
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
  const userId = req.user._id;
  try {
    const findNote = await Note.findById(noteId);
    if (!findNote) {
      const error = new Error("Note not found!");
      error.statusCode = 404;
      return next(error);
    }
    if (findNote.user_id.toString() !== userId.toString()) {
      const error = new Error("You are not authorized to view this note");
      error.statusCode = 403;
      return next(error);
    }
    return res.status(200).json({
      success: true,
      message: "Note retrieved successfully",
      note: findNote,
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
