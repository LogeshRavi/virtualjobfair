import React, { Component } from 'react';
import * as io from 'socket.io-client';
import faker from "faker";

import axios from 'axios'
import { OBJ } from './Schedule';
import { IconButton, Badge, Input, Button, StylesProvider } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import VideocamOffIcon from '@material-ui/icons/VideocamOff'
import MicIcon from '@material-ui/icons/Mic'
import MicOffIcon from '@material-ui/icons/MicOff'
import ScreenShareIcon from '@material-ui/icons/ScreenShare'
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare'
import CallEndIcon from '@material-ui/icons/CallEnd'
import ChatIcon from '@material-ui/icons/Chat';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import PeopleIcon from '@material-ui/icons/People';
import FeedbackIcon from '@material-ui/icons/Feedback';
import { Route } from 'react-router-dom'
import { message } from 'antd'
import 'antd/dist/antd.css'
import { FaStar } from 'react-icons/fa'
import { Row } from 'reactstrap'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.css'
import "./Video.css"
import { DISCLAIMER_ICON } from '../src/assests/img/images';
import { CLOSE_ICON } from '../src/assests/img/images';
import { Stars } from '@material-ui/icons';


// import {toast} from 

var server_url = process.env.NODE_ENV === 'production' ? 'http://localhost:4001' : "http://localhost:4001";

var client_url = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : "http://localhost:3000";

var connections = {}
const stars = Array(5).fill(0)
const colors = {
	orange: "#FFBA5A",
	grey: "#a9a9a9"
}
const peerConnectionConfig =



{

	iceServers: [{ urls: ["stun:ss-turn2.xirsys.com"] },
	{
		username: "2ZSHbjdUJbJBaLBqcu59xe2V8O7dNVfmg49gJViKG11k0vhMrd-xIEfCUv5MSfKHAAAAAGDdqglwcmF2ZWVu",
		credential: "59b879a0-da61-11eb-9f55-0242ac140004",
		urls: ["turn:ss-turn2.xirsys.com:80?transport=udp",
			"turn:ss-turn2.xirsys.com:3478?transport=udp",
			"turn:ss-turn2.xirsys.com:80?transport=tcp",
			"turn:ss-turn2.xirsys.com:3478?transport=tcp",
			"turns:ss-turn2.xirsys.com:443?transport=tcp",
			"turns:ss-turn2.xirsys.com:5349?transport=tcp"]
	}]
};
var socket = null
var socketId = null
var elms = 0


class WaitingPage extends Component {
	_isMounted = false;
	constructor(props) {
		super(props)

		this.localVideoref = React.createRef()

		this.videoAvailable = false
		this.audioAvailable = false

		this.state = {
			userMeet: this.props.match.params.url,
			video: false,
			audio: false,
			screen: false,
			showModal: false,
			showModal1: false,
			showModal2: false,
			showModal3: false,
			screenAvailable: false,
			messages: [],
			message: "",
			newmessages: 0,
			askForUsername: true,
			username: faker.internet.userName(),
			Name: "",
			connections1: [],
			userDetails: "",
			userNames: "",
			userNames1: false,
			userNumbers: "",
			url: "",
			startTime1: "",
			endTime1: "",
			allowChat: "",
			allowCodeEditor: "",
			allowOnlyHostSpeak: "",
			hostIn: "",
			hostScreenShareOnly: "",
			withoutVideo: "",
			endTime2: "",
			difference: "",
			showPopup: false,
			url5: this.props.match.params.url,
			host: "",
			starRating: 0,
			hoverRating: undefined,
			feedback: "",
			hostName: "",
			hostPresent: false

		}
		this.schedule()
		console.log(this.state.userMeet);
		connections = {}
		this.getPermissions();
		//this.checkPermission();

	}



	schedule = async () => {

		const data = {
			mettingId: this.state.userMeet
		}
		console.log(data)
		// let url = ''
		// let startTime1 = ''
		// let endTime1 = ''
		await axios.post('http://localhost:4001/api/getschedule', data)
			.then(res => {
				if (this._isMounted) {
					if (res.data.StatusCode == 200) {
						console.log(res.data.MeetingDetails)
						this.setState({
							url: res.data.MeetingDetails.mettingId,
							startTime1: res.data.MeetingDetails.startTime,
							endTime1: res.data.MeetingDetails.endTime,
							host: res.data.MeetingDetails.host,
							allowChat: res.data.MeetingDetails.allowChat,
							allowCodeEditor: res.data.MeetingDetails.allowCodeEditor,
							allowOnlyHostSpeak: res.data.MeetingDetails.allowOnlyHostSpeak,
							hostIn: res.data.MeetingDetails.hostIn,
							hostScreenShareOnly: res.data.MeetingDetails.hostScreenShareOnly,
							withoutVideo: res.data.MeetingDetails.withoutVideo
						})
					}
					else {
						alert('Invalid Meeting ID')
					}
				}
				//  url = res.data.MeetingDetails.mettingId
				//  startTime1 = res.data.MeetingDetails.startTime
				//  endTime1 = res.data.MeetingDetails.endTime
			})
	}




	hostIn = () => {
		const data = {
			mettingId: this.state.url5
		}

		axios.post('http://localhost:4001/api/longpoll', data)
			.then(res => {
                 console.log(res.data.Demo)
				if (res.data.Demo == "true") {
					this.setState({
						hostPresent: true
					})
					this.diff1()
				}
				else {
					console.log("test1")

				}
			})
	}

	hostpresent = () => {

		const data = {
			meetingId1: this.state.url
		}

		axios.post('http://localhost:4001/api/updateHost', data)
			.then(res => {
				if (res.data.StatusCode == "200") {
					console.log("test")
					this.checkPermission1()
				}
				else {
					console.log("test1")

				}
			})
	}


	 async componentDidMount() {
	// 	try {
	// 		this._isMounted = true;

	// 		// setTimeout(() => {
	// 		// 	this.checkPermission()
	// 		// }, 2000);

	// 		await setTimeout(() => {
	// 			var endTime = this.state.endTime1
	// 			var date = new Date();
	// 			var currentTime = Math.floor(date.getTime() / 1000);
	// 			console.log(currentTime)
	// 			var diff = endTime - currentTime
	// 			console.log(diff)
	// 			this.setState({ difference: diff }
	// 				,
	// 				() => {
	// 					this.diff(this.state.difference)
	// 				}
	// 			)
	// 			var rem5 = (diff - 300)
	// 			this.setState({ endTime2: rem5 } // 12:40 - 12:53  = 13 - 5 = 48
	// 				,
	// 				() => {
	// 					this.end(this.state.endTime2)
	// 				}
	// 			)
	// 		}, 2000);

	// 		this.diff1()

	// 		//var timeInterval = setInterval(this.hostIn(),30000)


	// 		// if (this.state.userNames1 === "false") {

				setInterval(() => {
					this.hostIn()
				}, 30000);

	// 		// }

	// 	}
	// 	catch (err) {

	 	}

	// }
	// setTimeout(() => {
	// 	this.checkPermission()
	// }, diff*1000);


	componentWillUnmount() {
		this._isMounted = false;

	}
	end = (e) => {
		console.log("rem 5min " + e)
		setTimeout(() => {
			this.togglePop()
			console.log("Meeting Will Ended in 5mins")
		}, e * 1000);

	}

	togglePop() {
		this.setState({
			showModal3: true
		});
	}
	diff = (e) => {
		console.log("end in " + e)
		setTimeout(() => {
			this.checkPermission()
			console.log("Meeting Ended ")
		}, e * 1000);

	}

	closeToggle = () => {
		this.setState({ showModal3: false })
	}

	checkPermission1 = () => {

		this.getPermissions()
		console.log(this.state.hostPresent)
		if (this.state.userDetails.indexOf(this.state.host) !== -1 || this.state.hostIn === "false" || this.state.hostPresent === true) {
			let url = this.state.url5
			window.location.href = `/join/${url}`
			console.log("Meeting Start")
			this.getPermissions();
		}
		else {
			
			console.log("Waiting for host to start Meeting!!! ")
		}
	}



	getPermissions = async () => {
		try {
			if (this.state.withoutVideo === "true") {
				await navigator.mediaDevices.getUserMedia({ video: false })
					.then(() => this.videoAvailable = false)
					.catch(() => this.videoAvailable = false)
			}
			else {
				await navigator.mediaDevices.getUserMedia({ video: true })
					.then(() => this.videoAvailable = true)
					.catch(() => this.videoAvailable = false)
			}
			await navigator.mediaDevices.getUserMedia({ audio: true })
				.then(() => this.audioAvailable = true)
				.catch(() => this.audioAvailable = false)

			if (navigator.mediaDevices.getDisplayMedia) {
				this.setState({ screenAvailable: true })
			} else {
				this.setState({ screenAvailable: false })
			}

			if (this.videoAvailable || this.audioAvailable) {
				await navigator.mediaDevices.getUserMedia({ video: this.videoAvailable, audio: this.audioAvailable })
					.then((stream) => {
						window.localStream = stream
						this.localVideoref.current.srcObject = stream
					})
					.then((stream) => { })
					.catch((e) => console.log(e))
			}
		} catch (e) { console.log(e) }
	}



	getMedia = () => {
		this.setState({
			video: this.videoAvailable,
			audio: this.audioAvailable
		}, () => {
			this.getUserMedia()
			this.connectToSocketServer()
		})
	}

	getUserMedia = () => {
		if ((this.state.video && this.videoAvailable) || (this.state.audio && this.audioAvailable)) {
			navigator.mediaDevices.getUserMedia({ video: this.state.video, audio: this.state.audio })
				.then(this.getUserMediaSuccess)
				.then((stream) => { })
				.catch((e) => console.log(e))
		} else {
			try {
				let tracks = this.localVideoref.current.srcObject.getTracks()
				tracks.forEach(track => track.stop())
			} catch (e) { }
		}
	}

	getUserMediaSuccess = (stream) => {
		try {
			window.localStream.getTracks().forEach(track => track.stop())
		} catch (e) { console.log(e) }

		window.localStream = stream
		this.localVideoref.current.srcObject = stream

		for (let id in connections) {
			if (id === socketId) continue

			connections[id].addStream(window.localStream)

			connections[id].createOffer().then((description) => {
				connections[id].setLocalDescription(description)
					.then(() => {
						socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
					})
					.catch(e => console.log(e))
			})
		}

		stream.getTracks().forEach(track => track.onended = () => {
			this.setState(
				{
					video: false,
					audio: false,
				}, () => {
					try {
						let tracks = this.localVideoref.current.srcObject.getTracks()
						tracks.forEach(track => track.stop())
					} catch (e) { console.log(e) }

					let blackSilence = (...args) => new MediaStream([this.black(...args), this.silence()])
					window.localStream = blackSilence()
					this.localVideoref.current.srcObject = window.localStream

					for (let id in connections) {
						connections[id].addStream(window.localStream)

						connections[id].createOffer().then((description) => {
							connections[id].setLocalDescription(description)
								.then(() => {
									socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
								})
								.catch(e => console.log(e))
						})
					}
				})
		})
	}

	getDislayMedia = () => {
		if (this.state.screen) {
			if (navigator.mediaDevices.getDisplayMedia) {
				navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
					.then(this.getDislayMediaSuccess)
					.then((stream) => { })
					.catch((e) => console.log(e))
			}
		}
	}

	getDislayMediaSuccess = (stream) => {
		try {
			window.localStream.getTracks().forEach(track => track.stop())
		} catch (e) { console.log(e) }

		window.localStream = stream
		this.localVideoref.current.srcObject = stream

		for (let id in connections) {
			if (id === socketId) continue

			connections[id].addStream(window.localStream)

			connections[id].createOffer().then((description) => {
				connections[id].setLocalDescription(description)
					.then(() => {
						socket.emit('signal', id, JSON.stringify({ 'sdp': connections[id].localDescription }))
					})
					.catch(e => console.log(e))
			})
		}

		stream.getTracks().forEach(track => track.onended = () => {
			this.setState({
				screen: false,
			}, () => {
				try {
					let tracks = this.localVideoref.current.srcObject.getTracks()
					tracks.forEach(track => track.stop())
				} catch (e) { console.log(e) }

				let blackSilence = (...args) => new MediaStream([this.black(...args), this.silence()])
				window.localStream = blackSilence()
				this.localVideoref.current.srcObject = window.localStream

				this.getUserMedia()
			})
		})
	}

	gotMessageFromServer = (fromId, message) => {
		var signal = JSON.parse(message)

		if (fromId !== socketId) {
			if (signal.sdp) {
				connections[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
					if (signal.sdp.type === 'offer') {
						connections[fromId].createAnswer().then((description) => {
							connections[fromId].setLocalDescription(description).then(() => {
								socket.emit('signal', fromId, JSON.stringify({ 'sdp': connections[fromId].localDescription }))
							}).catch(e => console.log(e))
						}).catch(e => console.log(e))
					}
				}).catch(e => console.log(e))
			}

			if (signal.ice) {
				connections[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
			}
		}
	}

	changeCssVideos = (main) => {
		let widthMain = main.offsetWidth
		let minWidth = "30%"
		if ((widthMain * 30 / 100) < 300) {
			minWidth = "300px"
		}
		let minHeight = "40%"

		let height = String(100 / elms) + "%"
		let width = ""
		if (elms === 0 || elms === 1) {
			width = "700px"
			height = "450px"
		} else if (elms === 2) {
			width = "45%"
			height = "100%"
		} else if (elms === 3 || elms === 4) {
			width = "35%"
			height = "50%"
		} else {
			width = String(100 / elms) + "%"
		}

		let videos = main.querySelectorAll("video")
		for (let a = 0; a < videos.length; ++a) {
			videos[a].style.minWidth = minWidth
			videos[a].style.minHeight = minHeight
			videos[a].style.setProperty("width", width)
			videos[a].style.setProperty("height", height)
		}

		return { minWidth, minHeight, width, height }
	}

	connect = () => {

		this.setState({ askForUsername: false }, () => this.getMedia());


	};

	diff1 = () => {

		this.checkPermission1()
	}
	diff2 = () => {
		console.log(this.state.userNames1, this.state.host)
		if (this.state.userNames1) {
			console.log("test")
			this.checkPermission1()
		}
	}


	connectToSocketServer = () => {
		socket = io.connect(server_url, { secure: true })

		socket.on('signal', this.gotMessageFromServer);



		socket.on('connect', () => {
			socket.emit('join-call', window.location.href)
			socketId = socket.id;


			socket.on('chat-message', this.addMessage)



			socket.on('user-left', (id) => {
				let video = document.querySelector(`[data-socket="${id}"]`)
				if (video !== null) {
					elms--
					video.parentNode.removeChild(video)

					let main = document.getElementById('main')
					this.changeCssVideos(main)
				}
			})

			socket.on('user-joined', (id, clients) => {
				console.log(clients);

				socket.emit('new-user', this.state.username);

				socket.on('user-array', (connections1) => {
					console.log(connections1)
					const uniqueNames = connections1.filter((val, id, array) => array.indexOf(val) == id);
					console.log(uniqueNames)

					this.setState({ userDetails: uniqueNames },
						() => {
							// localStorage.setItem('user', this.state.userDetails);
							// var storedContacts = localStorage.getItem("user");
							// console.log(storedContacts)
							// const names = [storedContacts]
							// console.log(names)
							this.hostIn()
							this.diff1(this.state.userDetails)
							this.checkPermission1()


						}
					);
				})

				clients.forEach((socketListId) => {
					connections[socketListId] = new RTCPeerConnection(peerConnectionConfig)
					// Wait for their ice candidate       
					connections[socketListId].onicecandidate = function (event) {
						if (event.candidate != null) {
							socket.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
						}
					}

					// Wait for their video stream
					connections[socketListId].onaddstream = (event) => {
						// TODO mute button, full screen button
						var searchVidep = document.querySelector(`[data-socket="${socketListId}"]`)
						if (searchVidep !== null) { // if i don't do this check it make an empyt square
							searchVidep.srcObject = event.stream
						} else {
							elms = clients.length
							let main = document.getElementById('main')
							let cssMesure = this.changeCssVideos(main)

							let video = document.createElement('video')

							let css = {
								minWidth: cssMesure.minWidth, minHeight: cssMesure.minHeight, maxHeight: "100%", margin: "10px",
								borderStyle: "solid", borderColor: "#bdbdbd", objectFit: "fill"
							}
							for (let i in css) video.style[i] = css[i]

							video.style.setProperty("width", cssMesure.width)
							video.style.setProperty("height", cssMesure.height)
							video.setAttribute('data-socket', socketListId)
							video.srcObject = event.stream
							video.autoplay = true
							video.playsinline = true

							main.appendChild(video)
						}
					}

					// Add the local video stream
					if (window.localStream !== undefined && window.localStream !== null) {
						connections[socketListId].addStream(window.localStream)
					} else {
						let blackSilence = (...args) => new MediaStream([this.black(...args), this.silence()])
						window.localStream = blackSilence()
						connections[socketListId].addStream(window.localStream)
					}
				})

				if (id === socketId) {
					for (let id2 in connections) {
						if (id2 === socketId) continue

						try {
							connections[id2].addStream(window.localStream)
						} catch (e) { }

						connections[id2].createOffer().then((description) => {
							connections[id2].setLocalDescription(description)
								.then(() => {
									socket.emit('signal', id2, JSON.stringify({ 'sdp': connections[id2].localDescription }))
								})
								.catch(e => console.log(e))
						})
					}
				}
			})
		})
	}

	silence = () => {
		let ctx = new AudioContext()
		let oscillator = ctx.createOscillator()
		let dst = oscillator.connect(ctx.createMediaStreamDestination())
		oscillator.start()
		ctx.resume()
		return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false })
	}
	black = ({ width = 640, height = 480 } = {}) => {
		let canvas = Object.assign(document.createElement("canvas"), { width, height })
		canvas.getContext('2d').fillRect(0, 0, width, height)
		let stream = canvas.captureStream()
		return Object.assign(stream.getVideoTracks()[0], { enabled: false })
	}

	handleVideo = () => this.setState({ video: !this.state.video }, () => this.getUserMedia())
	handleAudio = () => this.setState({ audio: !this.state.audio }, () => this.getUserMedia())
	handleScreen = () => this.setState({ screen: !this.state.screen }, () => this.getDislayMedia())

	handleEndCall = () => {
		try {
			let tracks = this.localVideoref.current.srcObject.getTracks()
			tracks.forEach(track => track.stop())
		} catch (e) { }
		window.location.href = "/"
	}

	openChat = () => this.setState({ showModal: true, newmessages: 0 })
	closeChat = () => this.setState({ showModal: false })
	handleMessage = (e) => this.setState({ message: e.target.value })

	addMessage = (data, sender, socketIdSender) => {
		this.setState(prevState => ({
			messages: [...prevState.messages, { "sender": sender, "data": data }],
		}))
		if (socketIdSender !== socketId) {
			this.setState({ newmessages: this.state.newmessages + 1 })
		}
	}

	handleUsername = (e) => {
		this.setState({ username: e.target.value });
		if (this.state.host === e.target.value) {
			this.setState({ userNames1: true })
		}
		if (this.state.host === e.target.value) {
			this.hostpresent()
		}
	}

	sendMessage = () => {
		socket.emit('chat-message', this.state.message, this.state.username)
		this.setState({ message: "", sender: this.state.username })
	}

	copyUrl = () => {
		let text = window.location.href
		if (!navigator.clipboard) {
			let textArea = document.createElement("textarea")
			textArea.value = text
			document.body.appendChild(textArea)
			textArea.focus()
			textArea.select()
			try {
				document.execCommand('copy')
				message.success("Link copied to clipboard!")
			} catch (err) {
				message.error("Failed to copy")
			}
			document.body.removeChild(textArea)
			return
		}
		navigator.clipboard.writeText(text).then(function () {
			message.success("Link copied to clipboard!")
		}, () => {
			message.error("Failed to copy")
		})
	}



	toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen(this.localVideoref);
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	}

	countTimers = () => {
		var timerVar = setInterval(countTimer, 1000);
		var totalSeconds = 0;
		function countTimer() {
			++totalSeconds;
			var hour = Math.floor(totalSeconds / 3600);
			var minute = Math.floor((totalSeconds - hour * 3600) / 60);
			var seconds = totalSeconds - (hour * 3600 + minute * 60);
			if (hour < 10)
				hour = "0" + hour;
			if (minute < 10)
				minute = "0" + minute;
			if (seconds < 10)
				seconds = "0" + seconds;
			document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
		}
	}

	users = () => {
		console.log(this.state.userDetails);
		var Details = this.state.userDetails.toString();
		console.log(Details);
		this.setState({ userNames: Details });
		var numberOfUsers = this.state.userDetails.length;
		this.setState({ userNumbers: numberOfUsers });
		console.log(this.state.userNumbers);
		this.setState({ showModal1: true });
	}

	closeUser = () => {
		this.setState({ showModal1: false })
	}

	feedback = () => {
		this.setState({ showModal2: true });
	}

	closeFeedback = () => {
		this.setState({ showModal2: false });
	}

	rating(value) {
		this.setState({ starRating: value })
		console.log(value)
	}

	hoverRating(value) {
		this.setState({ hoverRating: value })
	}

	mouseLeave = () => {
		this.setState({ hoverRating: "" })
	}

	handleMessage1 = (e) => {
		this.setState({ feedback: e.target.value })
		console.log(e.target.value)
	}

	submitfeedback = async () => {
		var feedback1 = document.getElementById("feedback").value;
		console.log(this.state.starRating)
		console.log(feedback1)

		const data = {
			mettingId: this.state.url,
			host: this.state.host,
			rating: this.state.starRating,
			comments: feedback1
		}
		this.closeFeedback()
		await axios.post('http://localhost:4001/api/feedback', data)
			.then(res => {
				console.log(res.data)
			})



	}

	videoOff = () => {
		console.log("test")
		this.setState({ video: false })
	}
	render() {
		return (
			<div className="joinPage">

				<div className="videoBox">

					<video id="my-video" ref={this.localVideoref} autoPlay muted style={{
						objectFit: "fill", width: "700px", height: "450px"
					}}></video>

					<div className="ctnr">
						<div className="mic-img">
							<IconButton style={{ color: "#424242" }} onClick={this.handleAudio}>
								{this.state.audio === true ? <MicIcon /> : <MicOffIcon />}
							</IconButton></div>
						<div className="mic-text"><p>Mic</p></div>
						<div className="Video-img"><IconButton style={{ color: "#424242" }} onClick={this.handleVideo}>
							{(this.state.video === true) ? <VideocamIcon /> : <VideocamOffIcon />}
						</IconButton></div>
						<div className="video-Text"><p>Video</p></div>
					</div>
				</div>

				<div className="videoContainer1">
					<div className="videoContainer2" >

						<p>Waiting for the host to start Meeting</p>



					</div>

					{/* <div className="videoContainer3">
	
									<p>Meeting link</p>
									<input variant="filled" value={window.location.href} disable="true" />
									<button variant="contained" color="primary" onClick={this.copyUrl} style={{ margin: "20px" }}>Copy</button>
	
								</div> */}
				</div>


			</div>

		)
	}

}
export default WaitingPage





