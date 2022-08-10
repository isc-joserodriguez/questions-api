const mongoose = require("mongoose"),
  Question = mongoose.model("Question"),
  codeResponses = require("../config").codeResponses;

const createQuestion = (req, res, next) => {
    console.log('Q')
  let question = new Question({ ...req.body });
  question
    .save()
    .then((question, error) => {
      if (error)
        return res.status(400).send({
          ...codeResponses[400],
          message: error,
        });
      return res.status(201).send({
        ...codeResponses[201],
        detail: question,
      });
    })
    .catch(next);
};

const getQuestions = (req, res, next) => {
  const filter =
    req.body.status !== undefined ? { status: req.body.status } : {};
  Question.find(filter)
    .then((questions, error) => {
      if (error) {
        return res.status(400).send({
          ...codeResponses[400],
          message: error,
        });
      } else if (questions.length === 0) {
        return res.status(404).send({
          ...codeResponses[404],
        });
      }
      return res.status(200).send({
        ...codeResponses[200],
        detail: questions,
      });
    })
    .catch(next);
};

const updateQuestion = (req, res, next) => {
    Question.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then((updatedQuestion, error) => {
        if (error) {
            return res.status(400).send({
                ...codeResponses[400],
                message: error
            });
        } else if (!updatedQuestion) {
            return res.status(404).send({
                ...codeResponses[404]
            });
        }
        return res.status(200).send({
            ...codeResponses[200],
            detail: updatedQuestion
        });
    }).catch(next);
}

module.exports = {
  createQuestion,
  getQuestions,
  updateQuestion,
};
