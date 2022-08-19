import mongoose from "mongoose";
import express from 'express'

export const createServer = async (app:express.Express)=> {

    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.hh6d2.mongodb.net/test`)
        
        console.log("Server Connected");
        app.listen(3000, ()=> console.log("Server Iniciado"))
    }catch(err){
        console.log("erro aqui", err);
        
    }

}
    
