const express = require('express')
const config  = require('./config/mainConfig.json')
const app = express()
const userHelper  = require('./helpers/usersHelper')

userHelper.readUsers(null, (results)  =>{
    console.log("Results ------ users", results)
})

app.get('/',(req,res) => res.send("Welcome to Micro-Services App"))

app.get('/ok',(req,res) => res.send("Welcome to Micro-Services App ----> OK"))


app.use('/users', require('./router/users-routes'))

app.listen(config.port,()=>{
    console.log(`<---------------${config.serviceName} is listening on port ------- > ${config.port}`)
})

