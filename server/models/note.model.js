const { mongoose } = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["high", "low", "mid"],
      default: "low",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    noteColor: {
      type: String,
      enum: [
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
      ],
      default: "bg-slate-100",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
