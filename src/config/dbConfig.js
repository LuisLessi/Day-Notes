const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://user:user@cluster0.8t9ocmx.mongodb.net/annotations?retryWrites=true&w=majority'

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = connection