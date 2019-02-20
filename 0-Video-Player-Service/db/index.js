const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/videoPlayerServiceDB';

const db = mongoose.connect(mongoUri, { useNewUrlParser: true });

module.exports = db;
