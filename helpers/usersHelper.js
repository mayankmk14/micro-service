const userDao =require('../dao/user-dao').bundleModel


const getModel = () => {
    return require('../dao/models/bundle-model').userModel
}

var readUsers = (query,cb) => {
    getModel().find(query || {}, (me, md) => {
        cb(me || md) //mongo error/data
    })
}
module.exports = {
    readUsers
}