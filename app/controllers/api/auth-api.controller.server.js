import passport from 'passport';
import userModel from '../../models/user.js';
import { GenerateToken } from '../../utils/index.js';

export function processLogin(req, res, next){
    passport.authenticate('local', (err, user, info) =>{
        if(err){
            console.error(err);
            res.end(err);
        }

        if(!user){
            return res.json({success: false, msg: 'ERROR: Authenticaion Failed'})
        }

        //no problems
        req.logIn(user, (err)=>{
            if(err){
                console.error(err);
                res.end(err);
            }

            const authToken = GenerateToken(user);
            return res.json({
                success: true,
                msg: 'Logged In successfully',
                user: {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    emailAddress : user.emailAddress,
                },
                token: authToken
            })
           
        })
    })(req,res,next);
}


export function processRegistration(req, res, next){
    let newUser = new userModel({
        ...req.body
    });

    userModel.register(newUser, req.body.password, (err) =>{
        if(err){
            if(err.name === 'UserExistsError'){
                console.error('ERROR: User already Exists')
            }
            console.log(err);

            return res.json({success: false, msg: 'ERROR: registration'})
        }
        return res.json({success: true, msg: ('User Registered successfully')})
    })
}

export function processLogout(res,req,next){
    req.logOut((err)=>{
        if(err){
            console.error(err);
            res.end(err);
        }

    })

    console.log('user Logged out');

    res.json({success: true, msg: 'User Logged out Sucessfully'})
}