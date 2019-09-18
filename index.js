const express = require('express')
const bodyParser = require("body-parser")
const jwt = require('jsonwebtoken')
const config = require('./config/mainConfig.json')
const app = express()
const userHelper = require('./helpers/usersHelper')
const conBuilder = require('./dao/connection')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all("*", (req, res, next) => {
    req.reqId = Math.random()
    console.log(`${req.reqId} | ${new Date} | ${req.method} | ${req.url} | ${req.method == 'GET' ? JSON.stringify(req.query) : JSON.stringify(req.body)}`)
    next()
})

app.post('/login', (req, res) => {
    conBuilder.userHelper.authorizeUser(req.body, (response) => {
        res.json(response)
    })
})

const allowCrossDomaim = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methos', 'GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-headers', 'x-access-token')

    next()
}

app.use(allowCrossDomaim)

userHelper.readUsers(null, (results) => {
    console.log("Results ------ users", results)
})


const verifyToken = (req, res, next) => {
    console.log("IN VERIFYTOKEN")
    var token = req.header['x-access-token']
    if (token) {
        jwt.verify(token, config.auth.appSecret, (err, decodedToken) => {
            if (err) {
                console.log("Invalid Token Provided => ",req.reqId)
                res.status(403).send({ auth: false, message: "False Token Provided" })
                return;
            }
            next()
        })

    } else {
        res.status(403).send({ auth: false, message: "No Token Provided" })
    }

}

app.get('/', (req, res) => res.send("Welcome to Micro-Services App"))

app.get('/ok', (req, res) => res.send("Welcome to Micro-Services App ----> OK"))


app.use('/users', verifyToken, require('./router/users-routes'))

app.listen(config.port, () => {
    console.log(`<---------------${config.serviceName} is listening on port ------- > ${config.port}`)
})

