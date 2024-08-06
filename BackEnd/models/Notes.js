const mongoose = require('mongoose')

const UserNotes = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
   },
   title: {
      require: true,
      type: String,
   },
   description: {
      type: String,
      require: true,
   },
   tag: {
      type: String,
   },
   date: {
      type: Date,
      default: Date.now
   }
});
module.exports = mongoose.model("Notes", UserNotes);