import React, { Component } from 'react';
import Select from 'react-select';
import {OBJ} from './Schedule'; 
// import DropDown from './Dropdown';
// import Popup from './Popup';
import { Input, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SettingsIcon from '@material-ui/icons/Settings';
import "./Home.css"
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import {CLOSE_ICON} from '../src/assests/img/images'  
import { ThreeSixty } from '@material-ui/icons';
 
const options = [
	{
	  value: 'Create meeting now', label: 'Create meeting now'
	}
  ]


class Home extends Component {
  	constructor (props) {
		super(props)
		this.state = {
			url: '',
			url1: '',
			Time: '',
			Time1: '',
			showModal: false,
			showModal2: false, 
			showPopup: false,
			isClicked: false,
			allowChat:false,
			withoutVideo:false,
			allowCodeEditor:false,
			hostScreenShareOnly:false,
			hostIn:false,
			allowOnlyHostSpeak:false
		}
		console.log(OBJ);
	}

	handleChange = (e) => this.setState({ url: e.target.value })


		join = () => {
		
		
		if (this.state.url !== "") {
			var url = this.state.url.split("/")
			window.location.href = `/join/${url[url.length-1]}`
		} else {
			var url = Math.random().toString(36).substring(2, 7)
			window.location.href = `/join/${url}`
	} 
}


		

		urlChange = (f) => this.setState({ url1: f.target.value })


		create = async () => {
			if (this.state.url1 !== "") {
				var url1 = this.state.url1.split("/")
				window.location.href = `/join/${url1}`
			} else {
				var url1 = Math.random().toString(36).substring(2, 7)
				window.location.href = `/join/${url1}`
		} 
		var element = document.getElementById("startDate").value;
		console.log(element);
		var element1 = document.getElementById("endDate").value;
		console.log(element1);
		var userName = document.getElementById("username").value;
		console.log(userName);
		


		const data = {
			mettingId:this.state.url1,
			startTime:element,
			endTime:element1,
			host:userName,
			allowChat:this.state.allowChat,
			allowCodeEditor:this.state.allowCodeEditor,
			withoutVideo:this.state.withoutVideo,
			hostScreenShareOnly:this.state.hostScreenShareOnly,
			hostIn:this.state.hostIn,
			allowOnlyHostSpeak:this.state.allowOnlyHostSpeak
		}

		await axios.post('http://localhost:4001/api/createMeeting',data)
	 	.then(res=>{
              console.log(res.data)
		 })


		}

		Popup = () => {
			const {showModal} = this.state
			this.setState({showModal : !showModal})
			// <Select options={options} />
		}

		togglePopup = () => {
			this.setState({ showModal2: true })
		}

		
		closeSettings = () => this.setState({ showModal2: false });

		handleCheckbox = () => {
			const {isClicked} = this.state
			this.setState({isClicked: !isClicked})
		}
		allowChat = (e) => {
			this.setState({
				allowChat: !this.state.allowChat,
			  });
		}
		allowCodeEditor = (e) => {
			this.setState({
				allowCodeEditor: !this.state.allowCodeEditor,
			  });
		}
		withoutVideo = (e) => {
			this.setState({
				withoutVideo: !this.state.withoutVideo,
			  });
		}
		hostScreenShareOnly = (e) => {
			this.setState({
				hostScreenShareOnly: !this.state.hostScreenShareOnly,
			  });
		}
		hostIn = (e) => {
			this.setState({
				hostIn: !this.state.hostIn,
			  });
		}
		allowOnlyHostSpeak = (e) => {
			this.setState({
				allowOnlyHostSpeak: !this.state.allowOnlyHostSpeak,
			  });
		}



	render() {
		return (
			<div className="container2">
				
				<div className="boxHead">
					<h1 style={{ fontSize: "45px" }}>Video Meeting</h1>
					<p style={{ fontWeight: "200" }}>Video conference website that lets you stay in touch with all your friends.</p>
				</div>
				<div className="wrapper">

					<div className="form-container">
						<div className="container3">
            			<div className="slide-controls">
               			<input type="radio" name="slide" id="login"></input>
               			<input type="radio" name="slide" id="signup"></input>
               			<label for="login" className="slide login" >Create a meeting</label>
               			<label for="signup" className="slide signup" >Join a meeting</label>
               			<div className="slider-tab"></div>
            			</div>
					
					<div className="form-inner">
               			<div className="login">
							<div className="container-work">
						    <div className="schedule">
								<button onClick = {this.Popup}>Schedule a meeting later</button>
							</div>
						   
							<div className="Meeting-container">   
								<div className="Container-Names">
                  				<div className="field1">
                     				<input placeholder="Meeting name" onChange={f => this.urlChange(f)} />
                 				</div>
                  				<div className="field2">
                     				<input id="username" placeholder="Host name" ></input>
                  				</div>
								</div>
							</div>
							{this.state.showModal === false ? (
								<div className="container-Meeting">
								<div className="Container-Dates">
								<div className="field3">
									<input id="startDate" type="datetime-local" placeholder="Start date and time"></input>
								</div>
								<div className="field4">
									<input  id="endDate" type="datetime-local" placeholder="End date and time"></input>
								</div>
								</div>
							</div>
							 ) : ("")} 
							
							<div className="settings">
								<div className="settings-container">
								<span>
									<IconButton style={{ color: "#424242" }} onClick={this.togglePopup}>
										<SettingsIcon />
									</IconButton>
								</span>
								<span className="settingsText">Meeting settings</span>
								</div>
							</div>

							<div className="settings-container">
								<Modal className="settings" show={this.state.showModal2} onHide={this.closeSettings} style={{ zIndex: "999999" }}>
									<Modal.Header className="settingsHeader">
										<div className="settingsTag">
										<Modal.Title>
											<p>Meeting settings</p>
										</Modal.Title>
											<button onClick={this.closeSettings}>{CLOSE_ICON}</button>
										</div>
									</Modal.Header>
									<Modal.Body className="settingsBody" style={{ overflow: "auto", overflowY: "auto", height: "300px" }} >
										<div className="div1">
											<span className="div1Text"><p>Enable code editor</p></span>
											<span className="div1switch">
										<label className="switch">
 											<input type="checkbox" id="togBtn" onClick={this.handleCheckbox} onChange={this.allowCodeEditor}/>
 										<div className="slider round">
 										</div>
										</label>
											</span>
										</div>
										<div className="div2">
											<span className="div2Text"><p>Enable chat</p></span>
											<span className="div2switch">
										<label className="switch">
 											<input type="checkbox" id="togBtn" onClick={this.handleCheckbox} onChange={this.allowChat}/>
 										<div className="slider round">
 										</div>
										</label>
											</span>
										</div>
										<div className="div3">
											<span className="div3Text"><p>Host meeting without Video</p></span>
											<span className="div3switch">
										<label className="switch">
 											<input type="checkbox" id="togBtn" onClick={this.handleCheckbox} onChange={this.withoutVideo} />
 										<div className="slider round">
 										</div>
										</label>
											</span>
										</div>
										<div className="div4">
											<span className="div4Text"><p>Only host can speak</p></span>
											<span className="div4switch">
										<label className="switch">
 											<input type="checkbox" id="togBtn" onClick={this.handleCheckbox} onChange={this.allowOnlyHostSpeak} />
 										<div className="slider round">
 										</div>
										</label>
											</span>
										</div>
										<div className="div5">
											<span className="div5Text"><p>Only host can share screen</p></span>
											<span className="div5switch">
										<label className="switch">
 											<input type="checkbox" id="togBtn" onClick={this.handleCheckbox} onChange={this.hostScreenShareOnly} />
 										<div className="slider round">
 										</div>
										</label>
											</span>
										</div>
										<div className="div6">
											<span className="div6Text"><p>Only host can let participants in</p></span>
											<span className="div6switch">
										<label className="switch">
 											<input type="checkbox" id="togBtn" onClick={this.handleCheckbox} onChange={this.hostIn} />
 										<div className="slider round">
 										</div>
										</label>
											</span>
										</div>
											{/* <div id="view">
												{this.state.isClicked ? <h2>It was clicked</h2> : <h2>Initial state</h2>}
											</div> */}
									</Modal.Body>
									<Modal.Footer className="settingsFooter">
										<button variant="contained" color="primary" onClick={this.togglePopup}>Save</button>
									</Modal.Footer>
								</Modal>
							</div>
								
							<div class="field-btn">
								<button id="create-btn" value="Create a meeting" onClick={this.create}>Create</button>
							</div>
                
							  </div>
							</div>
						</div>
            		</div>
					<div className="form-inner1">
						<div className="signup">
							<div className="field5">
								<input placeholder="Enter meeting link" variant="outlined"  onChange={e => this.handleChange(e)} />
								<button variant="contained"  onClick={this.join} style={{ margin: "20px" }}>Join</button>
							</div>
						</div>
					</div>
         		</div>
      		</div>
			</div>
		)
	}
}

export default Home;
