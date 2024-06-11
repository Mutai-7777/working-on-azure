import{Context } from "hono";
import {createAuthUserService, userLoginService} from "./auth.service";
import bycrypt from "bcrypt";
import {sign} from "hono/jwt";

export const registerUser = async (c: Context) =>{

  try {
      const user = await c.req.json();
      const pass = user.password;
      const hashedPassword = await bycrypt.hash(pass,10);
      user.password =  hashedPassword;


      const createdUser = await createAuthUserService(user);

      if (!createdUser) return c.text("User not created",404);
      
      return c.json(createdUser,201);
    }
    catch (error:any) {
      return c.json({error:error?.message},400)
    }
}
export const loginUser = async (c: Context) =>{
  try{
    const user = await c.req.json();
     //check if user exist
     const userExist = await userLoginService(user);
     if (userExist==null){
      return c.json({error: "User not found"} , 404) ;
     }


     const userMatch = await bycrypt.compare(user.password as string, userExist?.password as string); 
      if (!userMatch){
        return c.json({error: "Invalid credentials"} , 401) ;
      } else{

        //generate a JWT token
        //create a new
        const payload = {
          username:userExist?.username,
          role:userExist?.role,
          userId:userExist?.user.id,
          exp:Math.floor(Date.now() / 1000) + (60 * 180) //3 hour time for token to be valid
        } 
        let secret = process.env.JWT_SECRET as string;
        const token = await sign(payload, secret);
        
        
        let user = userExist?.user;
        let role = userExist?.role;

        return c.json({token ,user : {role,...user}}, 200);
      }

      
     return c.json({user:userExist, match:userMatch},200);
     
  }
  catch (error:any){
    return c.json({error:error?.message}, 400)
  } 

}