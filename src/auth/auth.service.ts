  

     
import { TSAuthOnUser,TIAuthOnUser,AuthOnUsersTable } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

  export const createAuthUserService = async ( user:TIAuthOnUser): Promise<string | null> => {
    await db.insert(AuthOnUsersTable).values(user);
    return "user created created successfully";

  }

  export const userLoginService = async (user:TSAuthOnUser) => {
    const {username,password} = user;
    return await db.query.AuthOnUsersTable.findFirst({
      columns:{
        username: true,
        role:true,
        password:true,
      },where:sql `${AuthOnUsersTable.username } = ${username} `,
     with:{
      user:{columns:{
        id:true,
        name: true,
        email:true,
        email_verified:true, 
        contact_phone:true,
        phone_verified:true,
        confirmation_code:true
      
      }

      }
     }
     
    })
  }