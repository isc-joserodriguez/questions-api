const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "no puede estar vacío"],
    },
    status: { type: Boolean, default: false },
  },
  { timestamps: true }
);

mongoose.model("Question", QuestionSchema);
