const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const questionSchema = new Schema({
    _id: {
      type:Number  
    },
    correct: String,
    options: [String],
    question: String,
})

const testSchema = new Schema({
    _id: Mongoose.Schema.Types.ObjectId,
    testName: {
        type: String,
        required: true
    },
    maxMarks: Number,
    perQuestionMarks: Number,
    negativeMarks: Number,
    questions: [questionSchema]

})
const Question = Mongoose.model("Question", questionSchema);
const Test = Mongoose.model("Test", testSchema);

module.exports = {
    Test, Question
}