const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const router=  express.Router()


router.post("/",authMiddleware.authMiddleware, upload.single("resume"), interviewController.generateInterViewReportController)
router.get("/:interviewID", authMiddleware.authMiddleware, interviewController.getInterviewReportByIdController)
router.get("/", authMiddleware.authMiddleware, interviewController.getAllInterviewReportsController)
router.get("/pdf/:interviewID", authMiddleware.authMiddleware, interviewController.generateResumePdfController)

module.exports = router