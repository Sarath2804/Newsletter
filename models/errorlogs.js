const mongoose = require("mongoose");

const ErrorlogsSchema = new mongoose.Schema(
    {
      fromemail: { type: String, required: true},
      toemail: { type: String, required: true},
      content:{type: String},
      errorcode:{type: String},
      errorcommand:{type: String},
      response:{type: String}
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("Errorlogs", ErrorlogsSchema);
