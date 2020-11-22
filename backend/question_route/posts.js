const expresss = require('express');
const router = expresss.Router();

const [userVerify] = require('../middleware/userVer');

const orgVerify = require('../middleware/orgVer').verify

const [addTest, addQuestion, checkResult,deleteQuestion, modifyQuestion,viewQuestions, viewStudentResult , viewTestList, addResources,addVideos] = require('../handlers/orgTest');

const [takeTest, submitTest , viewResult, viewTestGiven, viewResources, getTeachersId, search,viewVideos] = require('../handlers/userPost');

router.route('/users/takeTest').post(userVerify,  takeTest);
router.route("/users/submitTest").post(userVerify, submitTest)
router.route('/users/viewResult').post(userVerify,  viewResult);
router.route("/users/viewResources").post(userVerify,viewResources)
router.route("/users/viewVideos").post(userVerify,viewVideos)
router.route("/users/search").post(userVerify,search)

router.route("/orgs/addTest").post(orgVerify,addTest)
router.route("/orgs/questions/:_id").post(orgVerify,viewQuestions)
router.route("/orgs/addQuestions").post(orgVerify,addQuestion)
router.route("/orgs/questions/:id").put(orgVerify, modifyQuestion)
router.route("/orgs/delQuestions/:id").post(orgVerify, deleteQuestion)
router.route("/orgs/viewTestList").post(orgVerify,viewTestList)
router.route("/orgs/addResources").post(orgVerify,addResources)
router.route("/orgs/viewResources").post(orgVerify,viewResources)
router.route("/orgs/addVideos").post(orgVerify, addVideos)
router.route("/orgs/viewVideos").post(userVerify, viewVideos)


router.route("*").all((req, res, next) => res.send("route not found"))

module.exports = router