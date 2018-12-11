const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, default: '', unique: true, index: true },
    age: { type: Number, default: 1 }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users
