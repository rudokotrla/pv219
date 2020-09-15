const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
    name: String,
    birthNumber: String,
    medication: [String]

});

module.exports = mongoose.model('Requests', RequestSchema);