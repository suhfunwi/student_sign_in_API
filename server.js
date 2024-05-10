const express = require('express')
const apiRoutes = require('./routes/api.js')
const app = express()
//creates web app server
const path = require('path')
const staticFilePath = path.join(__dirname, 'client', 'dist')
const staticFiles = express.static(staticFilePath)
app.use('/', staticFiles)// request to home page
app.use(express.json())
//to handle json data coming in as requests
app.use('/api', apiRoutes)
app.use(function (err,req, res, next){
    res.status(404).send('Sorry, not found.')
    //404 is not found
})
app.use(function (req, res, next,error){
    console.log(error.stack)
    res.status(500).send('Server error')
})

const server = app.listen(process.env.PORT || 3000, function (){
    console.log('Express server running on port', server.address().port)
    //runs server
    //all of this is just setup for the express server
})