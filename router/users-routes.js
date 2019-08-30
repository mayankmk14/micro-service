const express = require('express')
const router = express.Router()

const dbFactory = require('../dao/connection')

console.log("IN users-routes-------")

router.get('/list',(req,res,next)=>{
    console.log("/users/list")
    dbFactory.userHelper.readUsers(req.query, (results)=>{
        console.log("Results",results)
    })
    res.send("in /users/list")
    next()
})

router.get('/new',(req,res,next)=>{
    console.log(" in /users/new")
    res.send("/users/new")
    next()
})

module.exports = router