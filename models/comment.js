let {Schema, model}= require('mongoose');

let commentSchema = new Schema({
    content :{
        type : String,
        required : true,
    },

    blogId :{
        type: Schema.Types.ObjectId ,
        ref : "blog",
    },

    createdBy : {
        type: Schema.Types.ObjectId ,
        ref : "user",
    },

},{timestamps : true}
);

let Comments = model("comment",commentSchema);
module.exports = Comments ;