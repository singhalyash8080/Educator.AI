const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userScoreSchema = new Schema({
    name: String,
    email: String,
    marks: Number,
    maxMarks: Number
})

const orgTestsSchema = new Schema({
    testId: {
        type:String,
        required:true
    },
    teacherId: {
        type:String,
        required:true
    },
    usersScores: [userScoreSchema]
})

const materialSchema = new Schema({
    name: String,
    text: String
})

const orgSchema = new Schema({
    _id: Mongoose.Schema.Types.ObjectId,
    teacherName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    testCreated:[String],
    vision: String,
    course: String,
    demoVideo: String,
    videos: [materialSchema],
    resources: [materialSchema]
})


const Org = Mongoose.model("Org", orgSchema);
const userScore = Mongoose.model('userScore', userScoreSchema)
const orgTests = Mongoose.model('orgTests', orgTestsSchema);

module.exports = {
    Org,userScore,orgTests
}