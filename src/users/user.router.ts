  
  import{Hono} from "hono";
  import{Context} from "hono";
  import { listUsers,getUser,createUser, updateUser, deleteUser} from "./user.controller";
  import {zValidator} from "@hono/zod-validator";
  import { userSchema } from "../validators.";
  import { adminRoleAuth,userRoleAuth } from "../midddleware/bearAuth"

  export const userRouter = new Hono();


////gets all users
  userRouter.get("/users",adminRoleAuth,  listUsers); //(c:Context) => {
//     return c.json(users, 200)
//   }); 

  //get a single user
  userRouter.get("/users/:id",userRoleAuth, getUser);

  //create a user
  userRouter.post("/users",zValidator('json',userSchema, (result,c)=>{
    if (!result.success) {
        return c.json(result.error,400)
    }
  }),createUser);
  
  //update a user
  userRouter.put("/users/:id", updateUser); 


userRouter.get("/users", zValidator('json',userSchema,(result,c)=>{
  if (!result.success){
    return c.json(result.error,400)
  }
}),createUser);

//delete user
userRouter.delete("/users/:id", deleteUser);
