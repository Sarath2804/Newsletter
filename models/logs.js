const mongoose = require("mongoose");

const LogsSchema = new mongoose.Schema(
    {
      fromemail: { type: String, required: true},
      toemail: { type: String, required: true},
      newsletterName : {type:String},
      response : {type:String}
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Logs", LogsSchema);
  