const mongoose=require('mongoose');
const router = require('express').Router();
const Schedule = require('../schema/schedule')

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
var data = await Schedule.findOne({ mettingId:meetingId1  })
if (data) {
	return res.send({ StatusCode: 200, StatusMessage: "Success", MeetingDetails:data });
}
else{
	return res.send({ StatusCode: 400, StatusMessage: "Failure" });
}
})
module.exports = router;
