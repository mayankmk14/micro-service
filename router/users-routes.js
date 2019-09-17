const express = require('express')
const router = express.Router()

const dbFactory = require('../dao/connection')

console.log("IN users-routes-------")

router.get('/list', (req, res, next) => {
    console.log("/users/list")
    dbFactory.userHelper.readUsers(req.query, (results) => {
        console.log("Results", results)
        res.send(results)
    })

})

router.get('/new', (req, res, next) => {
    console.log(" in /users/new")
    res.send("/users/new")

})

router.post('/add', (req, res, next) => {
    console.log(" in /users/add")
    dbFactory.userHelper.saveUsers(req.body, (results) => {
        res.json(results)
    })

})

router.put('/update', (req, res, next) => {
    console.log(" in /users/update")
    dbFactory.userHelper.updateUser(req.body.query,req.body, (results) => {
        res.json(results)
    })

})

module.exports = router