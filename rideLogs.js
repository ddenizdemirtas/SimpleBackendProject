const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const { rawListeners } = require('../models/rideLog')
const rideLog = require('../models/rideLog')
const router = express.Router()
const RideLog = require("../models/rideLog")
const Unicorn = require("../models/unicorn")



//ride a unicorn
router.post('/', async (req, res) => {
  
    const currRideLog = new RideLog({
        user: req.body.user,
        unicorn: req.body.unicorn,
        duration: req.body.duration
    })
    
    
    try {

       const currUnicorn = await Unicorn.find({name: req.body.unicorn})
       
       if (currUnicorn.length == 0) {
        return res.status(400).json("Cannot find unicorn") 
       }

       const prev = await RideLog.find({user: req.body.user, unicorn: req.body.unicorn})
       
       if (prev.length == 0) {
        const newRideLog = await currRideLog.save()
        res.status(201).json(newRideLog)
      } else {
        
        var myquery = {user: req.body.user}
        var newV = {$set: {duration: prev[0].duration += req.body.duration}}
        rideLog.updateMany(myquery, newV, function(err, res) {

          if (err) throw err;
          console.log(res.result.nModified + " document(s) updated");
          db.close();
        })
        res.json(prev)
       }
       
    } catch (err) {
        res.status(400).json({message: err.message})
    }

})


//get all rideLogs
router.get('/', async (req, res) => {
    try {
        const rideLogs = await RideLog.find()
        res.json(rideLogs)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//delete ridelog by id 
router.delete('/:id', getRideLog, async (req, res) => {
    try {
      await res.rideLog.remove()
      res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getRideLog(req, res, next) {
    let rideLog
    
    try {
      rideLog = await RideLog.findById(req.params.id)
      if (rideLog == null) {
        return res.status(404).json({ message: 'Cannot find unicorn' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.rideLog = rideLog
    next()
  }


module.exports = router