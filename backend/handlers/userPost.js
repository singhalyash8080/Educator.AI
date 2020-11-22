const Test = require('../models/Test').Test
const orgTests = require('../models/Orgs').orgTests
const userScore = require('../models/Orgs').userScore
const User = require("../models/User").User
const Org = require('../models/Orgs').Org;
const axios = require('axios');

function takeTest(req, res, next) {
    if (req.body.testId) {
        Test.findOne({ _id: req.body.testId }, (err, result) => {
            if (err) next(err)
            else {
                if (result == null) return res.status(400).json({ "err": "no such test exists" })
                else {
                    //send the user question and options
                    var questionSet = [];
                    result.questions.forEach((question) => {
                        var q = {
                            quid: question._id,
                            ques: question.question,
                            options: question.options
                        }
                        questionSet.push(q)
                    })
                    var data = { questionSet, testId: result._id }
                    res.send(data)
                }
            }
        })
    }
    else return res.status(400).json({ "err": "test id not present" })
}

function submitTest(req, res, next) {
    // passing all the validation

    if (req.body.testId == null) return res.status(400).json({ "err": "test id not given" })
    Test.findOne({ _id: req.body.testId }, (err, result) => {
        if (err) next(err)
        else if (result == null) return res.status(400).json({ "err": "no such test exists (source user)" })
        else {
            // iterate through answer array
            // and find answer values 
            let totalMarks = 0;
            let match = new Map()
            result.questions.forEach((value) => {
                match.set(value._id, value.correct)
            })

            // itertate through object array and 
            //get the current score
            req.body.ans.forEach((value) => {
                // check if key is there
                let correctAns = match.get(parseInt(value._id))
                console.log(value)
                console.log(value._id)
                console.log(value.ans)
                console.log(correctAns)
                // add marks if correct 
                if (value.ans != null && correctAns != null && correctAns.toLowerCase() == value.ans.toLowerCase()) {
                    totalMarks++
                }
            })
            // push the result to user

            orgTests.findOne({ testId: req.body.testId }, (err, result1) => {
                if (err) next(err)
                else if (result1 == null) {
                    return res.status(400).json({ "err": "No such test exists (source: Org)" })
                }
                else {
                    // add user 
                    let newUser = userScore({ name: req.body.name, email: req.body.email, marks: totalMarks, maxMarks: result.maxMarks })
                    // for first entry

                    if (result1.usersScores.length == 0) {

                        result1.usersScores = [newUser];
                        console.log(result1)
                        result1.save()
                            .then((studentResult) => {

                                User.findOne({ email: req.body.email }, (err, user) => {

                                    if (err) console.log(err)
                                    else
                                        user.testGiven.addToSet(req.body.testId)

                                    user.save((err, user) => {
                                        if (err) next(err)
                                    })

                                })

                                res.send(studentResult)

                            })
                            .catch((err) => next(err))

                    }
                    else {

                        f = 1

                        for (let i = 0; i < result1.usersScores.length; i++) {

                            if (result1.usersScores[i].email == newUser.email) {
                                f = 0
                                break
                            }

                        }

                        if (f) {

                            result1.usersScores.push(newUser)
                            console.log(result1)
                            result1.save()
                                .then((studentResult) => {

                                    User.findOne({ email: req.body.email }, (err, user) => {

                                        if (err) console.log(err)
                                        else
                                            user.testGiven.addToSet(req.body.testId)

                                        user.save((err, user) => {
                                            if (err) next(err)
                                        })

                                    })
                                    res.send(studentResult)
                                })
                                .catch((err) => next(err))

                        }
                        else {
                            return res.status(400).json({ "err": "User has already given the test" })
                        }

                    }

                }

            })
        }
    })
}

function viewResult(req, res, next) {
    if (req.body.testId && req.body.studentEmail) {

        orgTests.findOne({ testId: req.body.testId }, (err, result) => {
            if (err) next(err)
            else if (result == null) {
                return res.status(400).json({ "err": "No such test exists (source: Org)" })
            }
            else {

                f = 0

                for (let i = 0; i < result.usersScores.length; i++) {

                    console.log(result.usersScores[i])

                    if (result.usersScores[i].email == req.body.studentEmail) {

                        res.send(result.usersScores[i])
                        f = 1
                        break
                    }
                }

                if (!f) {
                    return res.status(400).json({ "err": "No such user exists" })
                }

            }
        })
    }
    else return res.status(400).json({ "err": "Test id or student id is not present" })
}


function viewTestGiven(req, res, next) {

    if (!req.body.email) res.status(400).json({ "err": "Email is required" })

    User.findOne({ email: req.body.email }, (err, user) => {

        if (err) res.send(err)

        if (user == null) return res.status(400).json({ "err": "No test given yet" })
        else if (user) res.send({ "testGiven": user.testGiven })

    })

}

function viewResources(req, res, next) {
    if (!req.body.teacherId) res.status(400).json({ "err": "Teacher id is required" })

    Org.findOne({ _id: req.body.teacherId }, (err, org) => {

        if (err) res.send(err)

        if (org == null) return res.status(400).json({ "err": "No teacher exists with given id" })
        else if (org) {

            res.send({
                resources: org.resources
            })
        }
    })

}

function viewVideos(req, res, next) {
    if (!req.body.teacherId) res.status(400).json({ "err": "Teacher id is required" })

    Org.findOne({ _id: req.body.teacherId }, (err, org) => {

        if (err) res.send(err)

        if (org == null) return res.status(400).json({ "err": "No teacher exists with given id" })
        else if (org) {

            res.send({
                videos: org.videos
            })
        }
    })

}

function getTeachersId(req, res, next) {

    var arrayOfId = []

    Org.find({}, (err, org) => {

        if (err) res.send(err)
        else {

            for (let i = 0; i < org.length; i++) {
                arrayOfId.push(org[i]._id)
            }

            res.send({
                arrayTeacherId: arrayOfId
            })

        }

    })
}

function search(req, res, next) {

    if (!req.body.course) return res.status(400).json({ "err": "course is required" })
    if (!req.body.vision) return res.status(400).json({ "err": "vision is required" })

    Org.find({}, (err, org) => {

        if (err) res.send(err)

        if (org) {

            var otherOrgModified = []


            var newOrg = org.filter(function (val) { return val.course === req.body.course })

            var obOfVision = {
                teachers:[],
                student:""  
            } //we have to send this in api request

            newOrg.forEach(element => {
                
                obOfVision.teachers.push({
                    id: element._id,
                    desc: element.vision
                })
            })

            obOfVision.student = req.body.vision 

            var exampleIds = []
            var exampleScores = []


            
            axios.post('http://bb6c22769e5d.ngrok.io/', obOfVision)
              .then(function (response) {
                // console.log(response.data)

                for (let i = 0; i < response.data.teachers.length; i++) {
                    exampleIds.push(response.data.teachers[i].id)
                    exampleScores.push(response.data.teachers[i].score)
                }
                
                // console.log(exampleIds)
                // console.log(exampleScores)
              })
              .then(()=>{
                var org1Name = ''
                var org2Name = ''
                var org3Name = ''
    
                var org1Score = ''
                var org2Score = ''
                var org3Score = ''
    
                var org1TestCreated=[]
                var org2TestCreated=[]
                var org3TestCreated=[]
    
    
                Org.findOne({ _id: exampleIds[0] }, (err, org1) => {
    
                    if (err) res.send(err)
                    else{
                        org1Name = org1.teacherName
                        org1Score = exampleScores[0]
                        org1TestCreated = org1.testCreated
                    }
    
                })
                .then(()=>{
                    Org.findOne({ _id: exampleIds[1] }, (err, org2) => {
    
                        if (err) res.send(err)
                        else {
                            org2Name = org2.teacherName
                            org2Score = exampleScores[1]
                            org2TestCreated = org2.testCreated
    
                        }
        
                    })
                    .then(()=>{
                        Org.findOne({ _id: exampleIds[2] }, (err, org3) => {
        
                            if (err) res.send(err)
                            else {
                                org3Name = org3.teacherName
                                org3Score = exampleScores[2]
                                org3TestCreated = org3.testCreated
    
                            }
            
                        })
                        .then(()=>{

                            
                            newOrg.forEach(element => {

                                f=1


                                for (let i = 0; i < 3; i++) {
                                    if(element._id==exampleIds[i]){
                                        f=0
                                    }
                                }

                                console.log(f)

                                if(f){
                                    otherOrgModified.push({
                                        _id: element._id,
                                        name: element.teacherName,
                                        testCreated: element.testCreated
                                    })

                                }

                                
                            })

                            res.send({
                                top3Result: [
                                    {
                                        _id: exampleIds[0],
                                        org1Name: org1Name,
                                        org1Score: org1Score,
                                        org1TestCreated: org1TestCreated
                                    },
                                    {
                                        _id: exampleIds[1],
                                        org2Name: org2Name,
                                        org2Score: org2Score,
                                        org2TestCreated: org2TestCreated
                                    },
                                    {
                                        _id: exampleIds[2],
                                        org3Name: org3Name,
                                        org3Score: org3Score,
                                        org3TestCreated : org3TestCreated
    
                                    },
                                ],
                                OtherResults: otherOrgModified
                                
                            })

                        })
        
                    })
    
                })
              })
              .catch(function (error) {
                console.log(error);
              });

        }
        else {
            return res.status(400).json({ "err": "select valid course for searching" })
        }

    })


}



module.exports = [takeTest, submitTest, viewResult, viewTestGiven, viewResources, getTeachersId, search,viewVideos]