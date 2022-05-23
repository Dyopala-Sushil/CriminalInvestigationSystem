const mongoose = require("mongoose")


const CriminalSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required:true
    },
    middleName:{
        type:String,
    },
    lastName:{
        type:String,
        required:true
    },
    sex:{
        type:String,
        required:true,
        enum:["Male", "Female", "Others"]
    },
    profession:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    tempAddress:{
        type:String,
    },
    permAddress:{
        type:String,
    },
    description:{
        type:String,
        required:true
    },
    images:[{
        public_id: {
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
        
    }]


},{
    timestamps:true
})


const Criminal = mongoose.model("Criminal", CriminalSchema)

module.exports = Criminal
