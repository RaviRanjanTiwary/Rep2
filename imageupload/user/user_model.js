var mongoose = require('mongoose');
var schema = mongoose.Schema;
var user_schema = new schema({
    name: String,
    age:String,
    add:[
        {
            Type:{
            type: String,
            enum: ["Home", "Office"]
                 },
            details:{
                type: String
            }
    }
    ],
    img: String,
    phone_no : String,
    statuse:{
        type:Boolean,
        default:false
    },
    password: String
})
module.exports = mongoose.model('userdetails', user_schema);
