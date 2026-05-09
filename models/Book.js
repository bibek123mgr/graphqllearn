const { default: mongoose } = require("mongoose");

const BookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auther"
    },
    // created_by: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // }

})
module.exports = mongoose.model("Book", BookSchema)