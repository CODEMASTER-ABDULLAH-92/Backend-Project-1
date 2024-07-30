const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lolopolo')
const userSchema = mongoose.Schema({
name:String,
email:String,
image:String,
password:String
})
module.exports = mongoose.model('user',userSchema);