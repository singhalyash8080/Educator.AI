// here posts of questions and test schemas will be handled
const Mongoose = require('mongoose');
const Test = require('../models/Test').Test
const Question = require('../models/Test').Question
const OrgTests = require('../models/Orgs').orgTests
const Org = require('../models/Orgs').Org;
const formidable = require('formidable');
const fs = require('fs')
const axios = require('axios');
const { resolve } = require('path');

function addTest(req, res, next) {

    axios.post('http://8c5c12cb5da4.ngrok.io/', {
        "text": req.body.text
    })
        .then(function (response) {
            // console.log(response)
            questions = (response.data.questions)
            console.log(questions)

            var test = new Test({
                _id: new Mongoose.Types.ObjectId(),
                testName: req.body.testName,
                maxMarks: req.body.maxMarks,
                perQuestionMarks: req.body.perQuestionMarks,
                negativeMarks: req.body.negativeMarks,
                questions: questions,

            })

            var OrgTest = new OrgTests({
                testId: test._id,
                teacherId: req.body.teacherId,
                userScores: []
            })

            Org.findOne({_id : req.body.teacherId}, (err,org) =>{

                org.testCreated.addToSet(test._id)

                org.save((err, user) => {
                    if (err) next(err)
                })
                
            })

            Test.findOne({ testName: test.testName }, (err, result) => {
                if (err) next(err)
                else {
                    if (!result) {

                        Promise.all([OrgTest.save(), test.save()])
                            .then((result) => { res.send(test) })
                            .catch((err) => next(err))

                    }
                    else {
                        return res.status(400).json({
                            err: "test with given name already exists"
                        })
                    }
                }
            })
        })
        .catch(function (error) {
            res.send(error);
        });

}

function addQuestion(req, res, next) {
    if (req.body.testId) {
        //check if test exists
        
        Test.findOne({ _id: req.body.testId }, (err, result) => {
            if (err) next(err)
            else {
                if (result == null) return res.status(400).json({"err":"no such test id exists"})
                else {

                    f=1
                    for (let i = 0; i < result.questions.length; i++) {
                        if(req.body.question._id==result.questions[i]._id){
                            f=0
                            break
                        }
                    }

                    if(f){

                        const value = { ...(req.body.question)}
                        result.questions.addToSet(new Question(value))
    
                        result.save((err, result) => {
                            if (err) next(err)
                            else{
                                console.log(value)
                                res.send({ result })
                            } 
                        })

                    }
                    else{
                        return res.status(400).json({"err":"ques with same id(ques no.) already exists"})
                    }

                }
            }

        })

    }
}

function modifyQuestion(req, res, next) {
    if (!req.params.id) return res.status(400).json({"err":"Question content can not be empty"})
    if (!req.body.testId) return res.status(400).json({"err":"Test id is required"})
    Test.findOne({ _id: req.body.testId }, (err, result) => {
        if (err) next(err)
        else {
            if (result == null) return res.status(400).json({"err":"no such test id exists"})
            else {
                //    console.log(req.body.question)
                //    console.log(req.params.id)
                let ques = {};
                result.questions = result.questions.map((q, index) => {
                    //replace with new ques

                    if (q._id == req.params.id) {

                        var newQues = { ...req.body.question, _id: req.params.id };
                        ques = new Question(newQues)
                        return ques

                    }
                    else return q;

                })
                result.save((err, val) => {
                    if (err) next(err)
                    else { res.send(ques); }
                })
            }
        }
    })
}

function deleteQuestion(req, res, next) {
    if (!req.params.id) return res.status(400).json({"err":"Question id cant be empty"})
    else {
        Test.findOne({ _id: req.body.testId }, (err, result) => {
            if (err) next(err)
            else {
                if (!result) return res.status(400).json({"err":"test with given testid not found"})
                else {
                    result.questions = result.questions.filter((q) => {
                        if (q._id == req.params.id) {
                            return false;
                        }
                        else return true;
                    })
                    result.save().then((result) => res.send(result)).catch((err) => res.send(err))

                }
            }
        })
    }
}
function viewQuestions(req, res, next) {

    Test.findOne({ _id: req.params._id }, (err, result) => {
        if (err) next(err)
        else {
            if (!result) return res.status(400).json({"err":"no such test exists"})
            else {
                res.send(result)
            }
        }
    })
}


function checkResult(req, res, next) {
    if (req.body.testId == null) return res.status(400).json({"err":"test id is null"})
    else {
        OrgTests.findOne({ testId: req.body.testId}, (err, result) => {
            if (err) next(err)
            else if (result == null) return res.status(400).json({"err":"no such test exists"})
            else {
                res.send(result.usersScores)
            }
        })
    }
}

function viewStudentResult(req, res, next) {
    if (req.body.testId && req.body.studentEmail) {

        orgTests.findOne({ testId: req.body.testId }, (err, result) => {
            if (err) next(err)
            else if (result == null) {
                return res.status(400).json({"err":"no such test exists"})
            }
            else {

                f = 0

                for (let i = 0; i < result.usersScores.length; i++) {

                    if (result.usersScores[i].email == req.body.studentEmail) {

                        res.send(result.usersScores[i])
                        f = 1
                        break
                    }
                }

                if (!f) {
                return res.status(400).json({"err":"no such user exists"})
                    
                }

            }
        })
    }
    else return res.status(400).json({"err":"Test id or student id is not present"})
}

function viewTestList(req,res,next){

    var testCreated = []

    if (!req.body.email) return res.status(400).json({"err":"Teacher email is required"})

    Org.findOne({email : req.body.email}, (err,org) =>{
        if(err){
            next(err)
        } 

        if(org==null){
            return res.status(400).json({"err":"No such teacher exists"})
        }
        else if(org){

            for (let i = 0; i < org.testCreated.length; i++) {

                console.log(org.testCreated)

                Test.findOne({_id: org.testCreated[i] },(err,test)=>{

                    if(err) next(err)

                    testCreated.push({
                        _id: test._id,
                        testName: test.testName
                    })

                    // console.log({
                    //     _id: test._id,
                    //     testName: test.testName
                    // })
                    
                })
                
            }

            setTimeout(()=>{
                res.send(testCreated)
            },2000)


        } 
        
    })

}

function addResources(req,res,next){

    if (!req.body.email) return res.status(400).json({"err":"Teacher email is required"})
    if (!req.body.resName) return res.status(400).json({"err":"Resource name is required"})
    if (!req.body.resText) return res.status(400).json({"err":"Resource text is required"})


    Org.findOne({email : req.body.email}, (err,org) =>{
        
        if(err){
            next(err)
        } 

        if(org==null){
            return res.status(400).json({"err":"No such teacher exists with this email"})
        }
        else if(org){

            org.resources.addToSet({
                name: req.body.resName,
                text: req.body.resText
            })

            org.save((err, user) => {
                if (err) next(err)

                if(user){
                    res.send(user)
                }
            })
        } 
        
    })

}

function addVideos(req, res, next) {

    if (!req.body.email) return res.status(400).json({ "err": "Teacher email is required" })
    if (!req.body.resName) return res.status(400).json({ "err": "Resource name is required" })
    if (!req.body.resText) return res.status(400).json({ "err": "Resource text is required" })


    Org.findOne({ email: req.body.email }, (err, org) => {

        if (err) {
            next(err)
        }

        if (org == null) {
            return res.status(400).json({ "err": "No such teacher exists with this email" })
        }
        else if (org) {

            org.videos.addToSet({
                name: req.body.resName,
                text: req.body.resText
            })

            org.save((err, user) => {
                if (err) next(err)

                if (user) {
                    res.send(user)
                }
            })
        }

    })

}

module.exports = [
    addTest, addQuestion, checkResult, deleteQuestion, modifyQuestion, viewQuestions, viewStudentResult, viewTestList,addResources,addVideos
]