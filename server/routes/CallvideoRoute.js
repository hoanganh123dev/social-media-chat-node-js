const router = require("express").Router();

const userController = require("../controllers/CallvideoController");
router.post("/start-audio-call", userController.startAudioCall);
router.post("/start-video-call", userController.startVideoCall);


module.exports = router;