const mongoose = require("mongoose");
const dbUrl = "mongodb://127.0.0.1:27017/cis";

mongoose.connect(dbUrl, function(err, succcess){
    if(err){
        console.log("Error in db Connection...");
    } else {
        console.log("DB connected successfully.");
    }
});