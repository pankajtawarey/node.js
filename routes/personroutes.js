const express = require('express');
const router = express.Router();
const person = require('./../modal/person');
const{jwtauthmiddleware,generatetoken}=require('./../jwt');
router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newperson = new person(data);

        const response = await newperson.save();
        console.log("data saved");

        const payload={
            id: response.id,
            username:response.username
        }
        console.log(JSON.stringify(payload));

        const token =generatetoken(response.username)
        console.log('token is',token);

        res.status(200).json({response:response,token:token});

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

router.post('/login',async(req,res)=>{
    try{
        // extact username and password from request body
        const {username,password}=req.body;
        //find the user by username
        const user=await person.findOne({username:username});
        // if user does not exit or password dose not match,return error
        if(!user||!(await user.comparePassword(password))){
            return res.status(401).json({error:'invalid username and password'});

        }
        //generate token
        const payload={
            id:user.id,
            username:user.username
        }
        const token= generatetoken(payload)

        //return token as response
        res.json({token})
        
    }catch(err){
        console.error(err);
        res.status(500).json({error:'internal server error'});
    }
})
//profile route
router.get('/profile',jwtauthmiddleware,async (req,res)=>{
    try{
        const userdata=req.user;
        console.log("user data",userdata);

        const userid=userdata.id;
        const user=await person.findById(userid);
        res.status(200).json({user})
    }catch(err){
        console.error(err);
        res.status(500).json({error:'internal server error'});
    }
})
router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log("data fatch person");
        res.status(200).json(data);
    } catch (err) {
        res.send(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
router.get('/:work', async (req, res) => {
    try {
        const worktype = req.params.work;
        if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {
            const response = await person.find({ work: worktype });
            console.log("data fatch");
            res.status(200).json(response);

        } else {
            res.status(404).json({ error: 'internal server error' })
        }
    } catch (err) {
        res.send(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
// updation 
router.put('/:id', async (req, res) => {
    try {
        const personid = req.params.id;
        const updatedata = req.body;
        const response = await person.findByIdAndUpdate(personid, updatedata, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(404).json({ error: 'person not found' })
        }
        console.log("data upadated")
        res.status(200).json(response);
    } catch (err) {
        res.send(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
//delete operation
router.delete('/:id', async (req, res) => {
    try {
        const personid=req.params.id;
        const deletedata=await person.findByIdAndDelete(personid);
        if (!response) {
            return res.status(404).json({ error: 'person not found' })
        }
        console.log("data deleted")
        res.status(200).json({message:'person deleted successfully'});
    } catch (err) {
        res.send(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
module.exports = router;