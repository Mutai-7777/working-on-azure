import "dotenv/config";
//import {migrate} from "drizzle-orm/node-postgres/migrator";
import {migrate} from "drizzle-orm/neon-http/migrator"
import {NeonHttpDatabase} from "drizzle-orm/neon-http"
import db from "./db";
 


const main = async () => {
  try{
    await migrate(db,{migrationsFolder: __dirname + "/migrations"});
    console.log("migration successful")
  }
  catch(e){
    console.error("error while migrating",e);
    process.exit(1);
  }
 }
main();
//  async function migration(){
//      try{console.log("========Migrating...==========");
//     await migrate(db as unknown as NeonHttpDatabase<Record<string , never>> , {migrationsFolder: __dirname + "/migrations"})
//     //await client.end()
//     console.log("========Migrated!==========");
//     process.exit(0);
//  }
//  catch(e){
//      console.error("error while migrating",e);
//      process.exit(1);
//  }
//  }

 //testing
 
  // migration().catch((f) => {
  //   console.error("error while migrating",f);
  //   process.exit(0);

  // })