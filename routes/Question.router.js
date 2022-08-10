const router = require("express").Router(),
  auth = require("../middlewares/auth");

const {
  createQuestion,
  getQuestions,
  updateQuestion,
} = require("../controllers/Question.controller");

router.post("/", createQuestion);
router.get("/", auth, getQuestions);
router.put("/:id", auth, updateQuestion);

module.exports = router;
