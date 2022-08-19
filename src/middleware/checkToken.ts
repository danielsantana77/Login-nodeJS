import { NextFunction,Request,Response } from "express"
import jwt from "jsonwebtoken"

export const checkToken = (req:Request,res:Response, next: NextFunction) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(404).json({msg: "Unauthorized"})
    }
    
    try{
        const secret = String(process.env.SECRET)
        jwt.verify(token,secret)

        next()

    }catch(err){
        return res.status(404).json({msg: "Invalid Token"})
    }

   
}