const mongoose = require("mongoose")
const Promise  = require("bluebird")

mongoose.Promise = Promise

var schemaObj = mongoose.Schema 

const userSchema = new schemaObj({
    name : String,
    usedId: String,
    password: String
},{strict:false})

userModel = mongoose.model('users',userSchema)

module.exports= userModel;