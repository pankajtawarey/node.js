const mongoose=require('mongoose');
const menuschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:["bitter","spicy","sweet","sour"],
        required:true
    },
    drink:{
        type:Boolean,
        required:true
    },
    numsales:{
        type:Number,
        required:true
    }
})

const menuitem=mongoose.model('menu',menuschema);
module.exports=menuitem;