let {Schema, model}= require('mongoose');

let blogSchema = new Schema({
    title : {
        type: String ,
        required : true,
    },

    body : {
        type: String ,
        required : true,
    },

    coverImage : {
        type: String ,
        required : false,
    },

    createdBy : {
        type: Schema.Types.ObjectId ,
        ref : "user",
    },



},{timestamps: true});

let Blog = model("blog",blogSchema);
module.exports = Blog ;