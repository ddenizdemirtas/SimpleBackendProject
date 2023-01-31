const mongoose = require('mongoose')

const rideLogSchema = new mongoose.Schema({
    
    user: {
        type: String,
        required: true
    },

    unicorn: {
        type: String,
        required: true
    },
    
    duration: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model("RideLog", rideLogSchema)