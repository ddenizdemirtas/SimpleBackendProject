const mongoose = require('mongoose')

const unicornSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    fur: {
        type: String,
        required: true
    },
    
    hornLength: {
        type: Number,
        required: true
    },

    isBaby: {
        type: Boolean,
        required: true
    },

    owner: {
        type: String,
        required: false
    }

})


module.exports = mongoose.model("Unicorn", unicornSchema)