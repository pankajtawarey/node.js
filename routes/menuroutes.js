const express=require('express');
const router=express.Router();
const menuitem = require('./../modal/menu');
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newmenu = new menuitem(data);
        const hello = await newmenu.save();
        console.log("data saved");
        res.status(200).json(hello);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "interner server error" });
    }
})
router.get('/', async (req, res) => {
    try {
        const data = await menuitem.find();
        console.log("data fatch menu");
        res.status(200).json(data);

    } catch (err) {
        res.send(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
router.get('/:taste',async (req,res)=>{
    try{
        const tastetype=req.params.taste;
        if(tastetype=="spicy"||tastetype=="bitter"||tastetype=="sweet"||tastetype=="sour"){
            const response=await menuitem.find({taste:tastetype});
            console.log("data is fatch menu item");
            res.send(response)
        }else{
            res.status(404).json({error:'not found in item taste'})
        }
    }catch(err){
        res.send(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
//create adding
module.exports=router;