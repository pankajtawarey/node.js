const passport=require('passport');
const localstrategy=require('passport-local').Strategy;
const person=require('./modal/person');
passport.use(new localstrategy(async (Username,password,done)=>{
    try{
        // console.log('recieved credential:',Username,password);
        const user=await person.findOne({username: Username});
        if(!user){
            return done(null,false,{message:'incorrect username'});
        }
        const isPasswordMatch= await user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message: "incorrect password"})
        }
    }catch(err){
return done(err)
    }
}))
module.exports=passport;
