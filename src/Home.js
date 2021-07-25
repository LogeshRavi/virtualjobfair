import React, { Component } from 'react';
import {OBJ} from './Schedule'; 
import { Input, Button, IconButton } from '@material-ui/core';
import "./Home.css"
import axios from 'axios'
 


class Home extends Component {
  	constructor (props) {
		super(props)
		this.state = {
			url: '',
			meetingId:"fgh"
		}
		console.log(OBJ);
	}

	handleChange = (e) =>{ 
		this.setState({ url: e.target.value })
		
		
	} 

	

	

	

// 	create = () => {
// 	var newArray = OBJ.Meeting.filter(function(value) {
// 		return value.meetingTime == "15:55 PM"
// 	}).map(function(value){return value.id})
// 	console.log(newArray);
// 		var element = document.getElementById("time").value;
  
//   if (element == "") {
//   alert("Please Enter Time");
//     return false;  
//   }
//   else {
// 	function formatAMPM(date) {
// 		var hours = date.getHours();
// 		var minutes = date.getMinutes();
// 		var ampm = hours >= 12 ? 'pm' : 'am';
// 		hours = hours % 12;
// 		hours = hours ? hours : 12; // the hour '0' should be '12'
// 		minutes = minutes < 10 ? '0'+minutes : minutes;
// 		var strTime = hours + ':' + minutes + ' ' + ampm;
// 		return strTime;
// 	  }
	  
// 	  var  time = formatAMPM(new Date);
// 	  console.log(time);
// 	var currentTime = new Date().getTime(time);
// 	console.log(currentTime);

// 	// get input time
// 	function timeTo12HrFormat(time) {  // Take a time in 24 hour format and format it in 12 hour format
// 		var time_part_array = time.split(":");
// 		var ampm = 'AM';

// 		if (time_part_array[0] >= 12) {
// 		ampm = 'PM';
// 		}

// 		if (time_part_array[0] > 12) {
// 		time_part_array[0] = time_part_array[0] - 12;
// 		}

// 		var formatted_time = time_part_array[0] + ':' + time_part_array[1] +  ' ' + ampm;

// 		return formatted_time;
// 	}



// 		var time1 = timeTo12HrFormat("16:25");
// 		console.log(time1);
// 		var inputTime = new Date().getTime(time1);
// 		console.log(inputTime);
  
// //   // get system local time
// //   var d = new Date();
// //   var m = d.getMinutes();
// //   var h = d.getHours();
// //   if(h == '00') {h = 24}
  
// //  // var currentTime = h+"."+m;
// //   var currentTime = new Date().getTime();
// //   console.log(currentTime);
 
// //   // get input time
// //   var time = element.split(":");
// //   var hour = time[0];
// //   if(hour == '0') {hour = 24}
// //   var min = time[1];
  
// //  // var inputTime = hour+"."+min;
// //  var inputTime = new Date("07/07/2021 10:40:00 AM").getTime()
// //   console.log(inputTime);
  
//   if (currentTime === inputTime) {
//     alert("You can use above link");
//   } 
//   else {
// 	let obj = {};
// 	obj.url = document.getElementById("url").value;
// 	let jsonObj1 = JSON.stringify(obj);
// 	console.log(jsonObj1);
// 	var join=()=> {
// 		var jsonObj = JSON.parse(jsonObj1);
// 		console.log(jsonObj);
// 		if (this.state.url !== "") {
// 			var url = this.state.url.split("/")
// 			window.location.href = `/${url[url.length-1]}`
// 		} else {
// 			var url = Math.random().toString(36).substring(2, 7)
// 			window.location.href = `/${url}`
// 		}
// 	}
// 	var totalTime = inputTime - currentTime;
// 	console.log(totalTime);
// 	setTimeout(join, totalTime);
	
//   }
//     }
      
// 	}

// newArray = this.state.obj.Time.filter((el, index) => {
// 	return el.id == "fgh" && 
// 	el.meetingTime == 4.00
// })

// newArray = this.state.obj.Time.filter(Time => Time.id==="fgh")

	meet = () => {
		
		
		//	get system local time
		
		// const date1 = new Date();
		// const time = date1.toTimeString().split(' ')[0].split(':');
		// var currentTime = (time[0] + ':' + time[1])
		// console.log(currentTime);

		// get input time
		
		var date = new Date('2021.07.24 18:00');
		var inputTime1 = Math.floor(date.getTime() / 1000);
		//  var inputTime1 = new Date("09/07/2021 10:05:00 AM").getTime()
		 console.log(inputTime1);

		 var date1 = new Date('2021.07.24 18:50');
		 var inputTime2 = Math.floor(date1.getTime() / 1000);
		  //var inputTime1 = new Date("09/07/2021 10:05:00 AM").getTime()
		  console.log(inputTime2);
		// 	const date2 = new Date(cred*1000);
		// //	var date= cred;
		// 	var hours = date2.getHours(); // minutes part from the timestamp
		// 	var minutes = date2.getMinutes(); // seconds part from the timestamp
		// //  var seconds = date2.getSeconds(); // will display time in 10:30:23 format
		// 	var inputTime = hours + ':' + minutes;
		// 	console.log(inputTime);
		
		 

		//   if(inputTime === currentTime) {
		// 	console.log("Hi")
		//   } else {
		// 	  alert ("The meet doesn't start")
		//   }
	}

		join = () => {
		
		
		if (this.state.url !== "") {
			var url = this.state.url.split("/")
			window.location.href = `/${url[url.length-1]}`
		} else {
			var url = Math.random().toString(36).substring(2, 7)
			window.location.href = `/${url}`
	} 
}


	render() {
		return (
			<div className="container2">
				
				<div>
					<h1 style={{ fontSize: "45px" }}>Video Meeting</h1>
					<p style={{ fontWeight: "200" }}>Video conference website that lets you stay in touch with all your friends.</p>
				</div>

				<div className="container3">
					<p style={{ margin: 0, fontWeight: "bold", paddingRight: "50px" }}>Join or create a new meeting</p>
					<Input placeholder="Enter meeting URL here" onChange={e => this.handleChange(e)}  />
					
					<button variant="contained"  onClick={this.join} style={{ margin: "20px" }}></button>
				</div>
				<div style={{
					background: "white", width: "30%", height: "auto", padding: "20px", minWidth: "400px",
					textAlign: "center", margin: "auto", marginTop: "100px"
				}}>
					<p style={{ margin: 0, fontWeight: "bold", paddingRight: "50px" }}>Start or join a meeting</p>
					<Input placeholder="URL" onChange={e => this.handleChange(e)} /> 
				<Button variant="contained" color="primary" onClick={this.meet} style={{ margin: "20px" }}>Meet</Button>
				</div>
			</div>
		)
	}
}

export default Home;
