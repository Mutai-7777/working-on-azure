import { Hono } from "hono";
import { Context } from "hono";
import { listaddress,getaddress,createaddress, updateaddress, deleteaddress} from "./address.controller";
import {zValidator} from "@hono/zod-validator";
import { addressSchema } from "../validators.";

export const addressRouter = new Hono();


//get all adresses
addressRouter.get("/address",listaddress);
//get a single adress
addressRouter.get("/address/:id", getaddress);
//create a user
addressRouter.post("/address",zValidator('json',addressSchema, (result,c)=>{
    if (!result.success) {
        return c.json(result.error,400)
    }
  }),createaddress);
  
  //update a address
  addressRouter.put("/address/:id", updateaddress); 


  addressRouter.get("/address", zValidator('json',addressSchema,(result,c)=>{
  if (!result.success){
    return c.json(result.error,400)
  }
}),createaddress);

//delete adress
addressRouter.delete("/address/:id", deleteaddress)

addressRouter.get("/address", getaddress);
