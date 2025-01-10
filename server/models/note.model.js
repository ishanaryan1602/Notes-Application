const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type:String,
    enum: ["high", "low", "mid"],
    default: "low",
  },
});

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
