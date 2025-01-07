const express = require('express');
const router = express.Router();
const person = require('./../modal/person');
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newperson = new person(data);

        const response = await newperson.save();
        console.log("data saved");
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
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