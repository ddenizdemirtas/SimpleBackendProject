const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const router = express.Router()
const RideLog = require("../models/rideLog")



router.get('/:unicorn', getLongestRide ,async (req, res) => {
    res.json({user: res.longest[0].get('user')})
})



async function getLongestRide(req, res, next) {
    
    let longest
    try {
        longest = await RideLog.find({unicorn: req.params.unicorn})
        .sort({duration: -1, user: 1}).limit(1)
        if (longest == null) {
            return res.status(404).json({message: 'Cannot find user'})
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }

    res.longest = longest
    next()
}

module.exports = router