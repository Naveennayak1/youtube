const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({

title: {type:String , required :true},
thumbnailUrl : {type:String , required:true},
description : {type : String},
channelId : [{type : mongoose.Schema.Types.ObjectId, ref:'Channel' , required :true}],
uploader : {type : mongoose.Schema.Types.ObjectId , ref :'User' , required:true},
views : {type:Number , default:0},
likes :{type:Number , default:0},
dislikes:{type:Number , default:0},
uploadDate : {type :Date , default : Date.now},
comments :[{type:mongoose.Schema.Types.ObjectId, ref:'comment'}],
category :{type:String, default:'General'},


}, {timestamps:true});

module.exports = mongoose.model('Video' , videoSchema);