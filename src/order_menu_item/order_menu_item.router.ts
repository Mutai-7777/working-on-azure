import { Hono } from "hono";
import { Context } from "hono";
import { listOrderMenuItem,getOrderMenuItem,createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem} from "./order_menu_item.controller";
import {zValidator} from "@hono/zod-validator";
import { orderMenuItemSchema } from "../validators.";

export const orderMenuItemRouter = new Hono();


//get all 
orderMenuItemRouter.get("/orderMenuItem",listOrderMenuItem);
//get a single 
orderMenuItemRouter.get("/orderMenuItem/:id", getOrderMenuItem);
//create a user
orderMenuItemRouter.post("/orderMenuItem",zValidator('json',orderMenuItemSchema, (result,c)=>{
    if (!result.success) {
        return c.json(result.error,400)
    }
  }),createOrderMenuItem);
  
  //update 
  orderMenuItemRouter.put("/orderMenuItem/:id", updateOrderMenuItem); 


  orderMenuItemRouter.get("/orderMenuItem", zValidator('json',orderMenuItemSchema,(result,c)=>{
  if (!result.success){
    return c.json(result.error,400)
  }
}),createOrderMenuItem);

//delete 
orderMenuItemRouter.delete("/orderMenuItem/:id", deleteOrderMenuItem)

orderMenuItemRouter.get("/orderMenuItem", getOrderMenuItem);

