const mongoose = require("mongoose")
const Promise  = require("bluebird")

mongoose.Promise = Promise

var schemaObj = mongoose.Schema 

const saleSchema = new schemaObj({
    productName : String,
    saleId: String,
    quantity: Number,
    price: Number,
    dateOfSale: Date
},{strict:false})

saleModel = mongoose.model('sales',saleSchema)

module.exports= saleModel;