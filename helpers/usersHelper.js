const userDao = require('../dao/user-dao').bundleModel
const jwt = require('jsonwebtoken')
const config = require('../config/mainConfig.json')


const getModel = () => {
    return require('../dao/models/bundle-model').userModel
}

var readUsers = (query, cb) => {
    getModel().find(query || {}, (me, md) => {
        cb(me || md) //mongo error/data
    })
}

var saveUsers = (payload, cb) => {
    new (getModel())(payload).save((me, md) => {
        cb(me || md) //mongo error/data
    })
}

var updateUser = (userId, payload, cb) => {
    console.log(":ghhhhhhhhhhh")
    getModel().update({ userId: userId }, payload, (me, md) => {
        cb(me || md) //mongo error/data
    })
}

var authorizeUser = (loginPayload, cb) => {

    readUsers(loginPayload, (loginUserResponse) => {
        try {

            loginUserResponse = JSON.parse(JSON.stringify(loginUserResponse))

        } catch (error) {
            console.log("ERROR in READ USER", error)
        }
        loginUserResponse = loginUserResponse[0]

        token = jwt.sign(loginUserResponse, config.auth.appSecret, { expiresIn: config.auth.expiresIn })

        if (loginUserResponse.length != 0) {
            cb({ token: token })
        } else {
            cb({ "error": "Invalid Login" })
        }

    })

}


module.exports = {
    readUsers,
    saveUsers,
    updateUser,
    authorizeUser
}