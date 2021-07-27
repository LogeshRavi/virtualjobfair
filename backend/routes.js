const mongoose=require('mongoose');
const router = require('express').Router();
const Schedule = require('../schema/schedule')
const Meeting = require('../schema/createMeeting')

// router.get('/getschedule', async (req, res) => {
// 	const meetingId1 = req.body.mettingId
// 	const data = Schedule.findone({mettingId:meetingId1 }, function (req, results) {
// 		if(results!=[]){
// 	         return res.send({ StatusCode: 200, StatusMessage: "Success", MeetingDetails:results });
// 		}
// 		else{
// 			return res.send({ StatusCode: 400, StatusMessage: "Failure" });
// 		}
//   })
// })


router.post('/getschedule', async (req, res) => {
	const meetingId1 = req.body.mettingId
var data = await Meeting.findOne({ mettingId:meetingId1  })
if (data) {
	return res.send({ StatusCode: 200, StatusMessage: "Success", MeetingDetails:data });
}
else{
	return res.send({ StatusCode: 400, StatusMessage: "Failure" });
}
})

router.post('/createMeeting', async (req, res) => {
	const date1 = new Date(req.body.startTime)
	const startTimeStamp1 = Math.floor(date1.getTime() / 1000);
	const date2 =new Date(req.body.endTime)
	const endTimeStamp1 = Math.floor(date2.getTime() / 1000);

	const meeting = new Meeting({
		mettingId:req.body.mettingId,
		startTime1:req.body.startTime,
		endTime1:req.body.endTime,
		startTime:startTimeStamp1,
		endTime:endTimeStamp1,
		host:req.body.host
		// allowScreenShare:req.body.allowScreenShare,
		// allowVideo:req.body.allowVideo,
		// allowCodeEditor:req.body.allowCodeEditor,
		// allowChat:req.body.allowChat
	})
   
	var data = await meeting.save();
    res.json({ StatusCode: 200, StatusMessage: "Success", Response: "Metting Create SuccessFully", MettingDetails: data })

})

router.post('/updateHost', async (req, res) => {

	console.log(req.body.meetingId1,req.body.host)
	var update = await Meeting.updateMany({ mettingId: req.body.meetingId1 }, {
		$set: {
		 host:req.body.host
		}
	  })

	  var data = await Meeting.findOne({ mettingId:req.body.meetingId1  })
	  res.json({ StatusCode: 200, StatusMessage: "Success", Response: "Update Host Name", hostName: data.host })



})

module.exports = router;
