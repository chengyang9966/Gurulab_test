
import { Router } from "express";
import { feedbackRouter } from "./feedback";



const v1Route = Router();
v1Route.use('/feedback',feedbackRouter)
v1Route.get('/health',(req,res,next)=>{
    res.send({message:'API working'})
});


export { v1Route };
