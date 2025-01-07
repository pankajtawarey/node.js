const mongoose=require('mongoose');
const url='mongodb://localhost:27017/Hotal';

mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection

db.on('connected',()=>{
    console.log("connected")
})
db.on('error',(err)=>{
    console.log("conection error",err)
})
db.on('disconnected',()=>{
    console.log("disconected")
})

module.exports=db;

