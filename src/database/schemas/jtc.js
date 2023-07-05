const {model, Schema } = require("mongoose");

let jtc = new Schema ({
    Guild: String,
    User: String,
    Channel: String
})

module.exports = model('jtc', jtc);
