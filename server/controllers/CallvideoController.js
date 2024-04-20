const AudioCall = require("../models/audioCall");
const VideoCall = require("../models/videoCall");

const appID = process.env.ZEGO_APP_ID;
const serverSecret = process.env.ZEGO_SERVER_SECRET;

exports.startAudioCall = catchAsync(async (req, res, next) => {
    const from = req.user._id;
    const to = req.body.id;
  
    const from_user = await User.findById(from);
    const to_user = await User.findById(to);
  
    // create a new call audioCall Doc and send required data to client
    const new_audio_call = await AudioCall.create({
      participants: [from, to],
      from,
      to,
      status: "Ongoing",
    });
  
    res.status(200).json({
      data: {
        from: to_user,
        roomID: new_audio_call._id,
        streamID: to,
        userID: from,
        userName: from,
      },
    });
  });
  
  exports.startVideoCall = catchAsync(async (req, res, next) => {
    const from = req.user._id;
    const to = req.body.id;
  
    const from_user = await User.findById(from);
    const to_user = await User.findById(to);
  
    // create a new call videoCall Doc and send required data to client
    const new_video_call = await VideoCall.create({
      participants: [from, to],
      from,
      to,
      status: "Ongoing",
    });
  
    res.status(200).json({
      data: {
        from: to_user,
        roomID: new_video_call._id,
        streamID: to,
        userID: from,
        userName: from,
      },
    });
  });
  
  exports.getCallLogs = catchAsync(async (req, res, next) => {
    const user_id = req.user._id;
  
    const call_logs = [];
  
    const audio_calls = await AudioCall.find({
      participants: { $all: [user_id] },
    }).populate("from to");
  
    const video_calls = await VideoCall.find({
      participants: { $all: [user_id] },
    }).populate("from to");
  
    console.log(audio_calls, video_calls);
  
    for (let elm of audio_calls) {
      const missed = elm.verdict !== "Accepted";
      if (elm.from._id.toString() === user_id.toString()) {
        const other_user = elm.to;
  
        // outgoing
        call_logs.push({
          id: elm._id,
          img: other_user.avatar,
          name: other_user.firstName,
          online: true,
          incoming: false,
          missed,
        });
      } else {
        // incoming
        const other_user = elm.from;
  
        // outgoing
        call_logs.push({
          id: elm._id,
          img: other_user.avatar,
          name: other_user.firstName,
          online: true,
          incoming: false,
          missed,
        });
      }
    }
  
    for (let element of video_calls) {
      const missed = element.verdict !== "Accepted";
      if (element.from._id.toString() === user_id.toString()) {
        const other_user = element.to;
  
        // outgoing
        call_logs.push({
          id: element._id,
          img: other_user.avatar,
          name: other_user.firstName,
          online: true,
          incoming: false,
          missed,
        });
      } else {
        // incoming
        const other_user = element.from;
  
        // outgoing
        call_logs.push({
          id: element._id,
          img: other_user.avatar,
          name: other_user.firstName,
          online: true,
          incoming: false,
          missed,
        });
      }
    }
  
    res.status(200).json({
      status: "success",
      message: "Call Logs Found successfully!",
      data: call_logs,
    });
  });
  