const { uniq } = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
//define the person schema
const persons = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    }, work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        uniq: true
    },
    address: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})

persons.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();
    try {  // hash password generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashpassword = await bcrypt.hash(person.password, salt);
        person.password = hashpassword
        next();
    } catch (err) {
        return next(err);
    }
})
persons.methods.comparePassword = async function (candidatePassword) {
    try {
        const ismatch = await bcrypt.compare(candidatePassword, this.password)
        return ismatch;
    } catch (err) {
        throw err;
    }
}
//create person modal
const person = mongoose.model('person', persons);
module.exports = person;