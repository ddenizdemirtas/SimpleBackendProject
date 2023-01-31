const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const router = express.Router()
const Unicorn = require("../models/unicorn")


//route for getting all unicorns 
router.get('/', async (req, res) => {

    try {
        let unicorns
        if (req.query.hasOwnProperty('fur')) {
            unicorns = await Unicorn.find(req.query)
        } else { 
        unicorns = await Unicorn.find()
        }
        res.json(unicorns)
    } catch (err) {
        res.status(500).json({message: err.message})
    }

})

//route for getting one unicorn
router.get('/:id', getUnicorn, (req, res) => {
    res.json(res.unicorn)
})

//create unicorn
router.post('/',  async (req, res) => {
    
    const unicorn = new Unicorn({
        name: req.body.name,
        fur: req.body.fur,
        hornLength: req.body.hornLength,
        isBaby: req.body.isBaby,
        owner: req.body.owner
    })

    try {
        const newUnicorn = await unicorn.save()
        res.status(201).json(newUnicorn)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})


//update unicorn
router.patch('/:id', getUnicorn, async (req, res) => {

    if (req.body.name != null) {
        res.unicorn.name = req.body.name
    }
    if (req.body.hornLength != null) {
        res.unicorn.hornLength = req.body.hornLength
    }
    if (req.body.isBaby != null) {
        res.unicorn.hornLength = req.body.isBaby
    }
    if (req.body.fur != null) {
        res.unicorn.fur = req.body.fur
    }
    if (req.body.owner != null) {
        res.unicorn.owner = req.body.owner
    }

    try {
        const updatedUnicorn = awaitres.unicorn.save()
        res.json(updatedUnicorn)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//delete unicorn
router.delete('/:id', getUnicorn, async (req, res) => {
    try {
      await res.unicorn.remove()
      res.json({ message: 'Deleted Subscriber' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })


  async function getUnicorn(req, res, next) {
    let unicorn
    
    try {
      unicorn = await Unicorn.findById(req.params.id)
      if (unicorn == null) {
        return res.status(404).json({ message: 'Cannot find subscriber' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.unicorn = unicorn
    next()
  }
  

module.exports = router