const { default: mongoose } = require("mongoose");

const AutherSchema = new mongoose.Schema({

    name: {
        type: String
    }

})

module.exports = mongoose.model("Auther", AutherSchema)