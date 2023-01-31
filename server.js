require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL) 
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


app.use(express.json())

const unicornsRouter = require('./routes/unicorns')
const rideLogsRouter = require('./routes/rideLogs')
const longestRiderRouter = require('./routes/longest-rider')
app.use('/unicorns', unicornsRouter)
app.use('/rideLogs', rideLogsRouter)
app.use('/longest-rider', longestRiderRouter)

app.listen(3000, () => console.log('Server started'))