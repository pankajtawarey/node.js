// //json string to convert json object
// const objectstring='{"name":"pankaj","age":56}';
// console.log(typeof objectstring)
// const objectjson=JSON.parse(objectstring)
// console.log( typeof objectjson)
// console.log(objectjson.name)
// // conevert object to string
// const object=JSON.stringify(objectjson)
// console.log( typeof object)
// console.log(object)

//create a server
const express=require('express')//import express
const app=express();

app.get('/',function(req,res){
    res.send('welcome  to localhost')
})
// app.get('/chaap',(req,res)=>{
//     var chaaplist={
//         "malaichaap":100,
//         "afgaanichaap":150,
//         "tandoorichaap":200,
//         "chaaproll":120
//     }
//     res.send(chaaplist)
// })

// app.get('/chicken',(req,res)=>{
//     var menu={
//         "dish":"cormachicken",
//         "price":78
//     }
//     res.send(menu )
// res.send("hello chicken")
// })
// app.post('/items',(req,res)=>{
//     res.send("data is saved")
// })
app.listen(3000,()=>{
    console.log("server is running")
})
