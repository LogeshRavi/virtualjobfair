const mongoose = require('mongoose')

const createMeetingSchema = mongoose.Schema({

    mettingId:{
        type:String,
        required:true,
    },
    startTime1:{
        type:String,
        
    },
    endTime1:{
        type:String,
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
    },
    host:{
        type:String,
        required:true
    }
    // allowScreenShare:{
    //     type:String,
    //     required:true
    // },
    // allowVideo:{
    //     type:String,
    //     required:true
    // },
    // allowCodeEditor:{
    //     type:String,
    //     required:true
    // },
    // allowChat:{
    //     type:String,
    //     required:true
    // }
    


})

module.exports=mongoose.model('Meeting',createMeetingSchema)