const { uniq } = require('lodash');
const mongoose=require('mongoose');
//define the person schema
const persons=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        uniq:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
})
//create person modal
const person=mongoose.model('person',persons);
module.exports=person;