const mongoose = require('mongoose')

const scheduleSchema = mongoose.Schema({

    mettingId:{
        type:String,
        required:true,
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    }
    


})

module.exports=mongoose.model('schedules',scheduleSchema)
