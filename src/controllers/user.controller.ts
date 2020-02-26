import  { Request, Response } from 'express'
import User, { IUser } from '../models/user'
import config from '../config/config'
import jwt from 'jsonwebtoken'

function createToken(user: IUser){
    return jwt.sign({id: user.id, email: user.email}, config.key, {expiresIn: 60 * 60 * 24});
}

export const signup = async (req: Request, res: Response) => {
    try {
        if(!req.body.email || !req.body.password){
            return res.status(400).json({
                msg: 'please send your email and password'
            })
        }else{
            const user = await User.findOne({email: req.body.email});
            if(user){
                return res.status(400).json({
                    msg: 'this user already exist'
                })
            }else{
                const newUser: IUser = new User(req.body);
                await newUser.save();
                return res.status(201).json({
                    msg: 'User has been created successfully',
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

export const signin = async (req: Request, res: Response) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            msg: 'please send your email and password'
        })
    }else{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json({
                msg: 'user not found'
            })
        }else{
            const validatePassword = await user.comparePassword(req.body.password)
            if(validatePassword){
                return res.status(200).json({
                    auth: true,
                    token: createToken(user)
                })
            }else{
                return res.status(401).json({
                    auth: false,
                    msg: 'password invalid'
                })
            }
        }
    }
}