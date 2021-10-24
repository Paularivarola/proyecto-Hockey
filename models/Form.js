const mongoose = require('mongoose')

const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
   
  });
  const Form = mongoose.model("form", formSchema);
  module.exports = Form;