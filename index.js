const express = require('express')
const bodyParser = require("body-parser")
const config  = require('./config/mainConfig.json')
const app = express()
const userHelper  = require('./helpers/usersHelper')
const conBuilder = require('./dao/connection')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.all("*",(req,res,next)=>{
    req.reqId = Math.random()
    console.log(`${req.reqId} | ${new Date} | ${req.method} | ${req.url} | ${req.method == 'GET' ? JSON.stringify(req.query) : JSON.stringify(req.body)}`)
    next()
})

app.post('/login', (req,res) => {
    conBuilder.userHelper.authorizeUser(req.body, (response) =>{
        res.json(response)
    })
})

userHelper.readUsers(null, (results)  =>{
    console.log("Results ------ users", results)
})

app.get('/',(req,res) => res.send("Welcome to Micro-Services App"))

app.get('/ok',(req,res) => res.send("Welcome to Micro-Services App ----> OK"))


app.use('/users', require('./router/users-routes'))

app.listen(config.port,()=>{
    console.log(`<---------------${config.serviceName} is listening on port ------- > ${config.port}`)
})

