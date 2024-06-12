import {pgTable,serial,text,PgDate,varchar,boolean,integer,primaryKey,timestamp} from "drizzle-orm/pg-core";
import{relations} from "drizzle-orm";
import { decimal } from "drizzle-orm/mysql-core";
import { pgEnum} from "drizzle-orm/pg-core";






//authentication
export const roleEnum = pgEnum("role",["admin","user"])
export const AuthOnUsersTable = pgTable("auth_on_users",{
    id: serial("id").primaryKey(),
    userId:integer("user_id").notNull().references(()=> UsersTable.id,{ onDelete:"cascade"}),
    password:varchar("password"),
    username:varchar("username"),
    role:roleEnum("role").default("user")

})
//relationship
export const authRelations = relations(AuthOnUsersTable,({one}) => ({
    user : one(UsersTable,{
        fields: [AuthOnUsersTable.userId],
        references: [UsersTable.id]
    })
}))

  export const RestrauntTable = pgTable("restraunt",{
    id:serial("id").primaryKey(),
    name:text("name").notNull(),
    street_address:varchar("street_address", {length:100}).notNull(),
    zip_code: varchar("zip_code", {length:300}).notNull(),
   // city_id: integer("city_id").notNull().references(()=> cityTable.id,{onDelete:"cascade"}),
    menu_item:text("menu_item").notNull(),
    orders: text("orders").notNull(),
    restraunt_owner: text("restraunt_owner").notNull()
    
  });


                                         
  //menu table

    export const menu_itemTable = pgTable("Menu_item",{
        id:serial("id").primaryKey(),
        name: varchar("name", {length:256}).notNull(),
        restraunt_id:integer("restraunt_id").notNull().references(()=> RestrauntTable.id,{ onDelete:"cascade"}),
        category_id:integer("category_id").notNull().references(()=> categoryTable.id,{ onDelete:"cascade"}),
        description: text("description").notNull(),
        ingredients: text("ingredients").notNull(),
        price: integer("price").notNull(),
        active: boolean("active").notNull(),

    });

   
////city table
    export const cityTable = pgTable("cityTable",{
        id: serial("id").primaryKey(),
        name: text("name").notNull(),
        state_id: integer("state_id").notNull().references(()=> stateTable.id,{ onDelete:"cascade"}),
        zip_code:integer("zip_code").notNull()
    })
  
    

//Order table
 export const  OrdersTable = pgTable("Order",{
    id :serial("id").primaryKey(),
    estimated_delivery_time: text("delivey_estimated").notNull(),
    actual_delivery_time: text("actual_delivery_time").notNull(),
    delivery_address_id: integer("delivery_address_id").notNull().references(()=> addressTable.id,{ onDelete:"cascade"}),
    user_id: integer("user_id").notNull().references(()=> UsersTable.id,{ onDelete:"cascade"}),
    driver_id: integer("driver_id").notNull().references(()=> driverTable.id,{ onDelete:"cascade"}),
    price: integer("price").notNull(),
    discount: integer("discount").notNull(),
    final_price: integer("final_price").notNull(),
    comment: text("comment").notNull(),
   // restraunt_id: integer("resrtraunt_Id").notNull().references(() => RestrauntTable.id,{onDelete:"cascade"})   
 });


 //state table
 export const stateTable= pgTable("state",{
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    code: text("code").notNull(),
    city: text("city").notNull()

 });

  //address table
 export const addressTable= pgTable("address",{
    id : serial("id").primaryKey(),
    street_adddress_1: text("street_adddress_1").notNull(),
    street_adddress_2: text("street_adddress_2"),
    zip_code: integer("zip_code").notNull(),
    delivery_instructions: text("delivery_instructions"),
    user_id: integer("user")
 })
 ///////adress relationships
 export const AddressRelationss = relations(addressTable,({one}) => ({
    city_id : one(cityTable,{
        fields: [addressTable.id],
        references: [cityTable.id]
    }),
     comment:one (commentTable,{
         fields: [addressTable.id],
        references: [commentTable.id]
       })
}))



 //restraunt owner table
 export const restrauntownerTable = pgTable("restrauntowner",{
    id : serial("id").primaryKey(),
    restrauntid : integer("restrauntowner_id").notNull().references(() => RestrauntTable.id,{onDelete:"cascade"}),
    ownerid: integer("owner_id")
 })

 //users table

 export const UsersTable = pgTable("Users",{
    id : serial("id").primaryKey(),
    name : text("name").notNull(),
    email: text("email").notNull(),
    email_verified : boolean("email_verified").notNull(),
    contact_phone: text("contact_phone").notNull(),
    phone_verified: boolean("phone_number").notNull(),
    confirmation_code: text("confirmation_code"),
    restraunt_owner: text("restraunt_owner").notNull(),
    address: text("address").notNull(),
    
 })
                                       
                                         

 // driver table
 export const driverTable = pgTable("driver",{
    id : serial("id").primaryKey(),
    car_make: text("make").notNull(),
    car_model: text("model").notNull(),
    car_year: integer("year").notNull(),
    user_id: integer("user_id").notNull().references(()=> UsersTable.id,{ onDelete:"cascade"}),

    
 })
    //comments table
    export const commentTable = pgTable("comments",{
        id : serial("id").primaryKey(),
        order_id : integer("order_id").notNull().references(()=> OrdersTable.id,{ onDelete:"cascade"}),
        user_id : integer("user_id").notNull().references(()=> UsersTable.id,{ onDelete:"cascade"}),
        comment_text : text("text").notNull()
        
    })

    //category table
    
    export const categoryTable = pgTable("category",{
        id : serial("id").primaryKey(),
        name : text("name").notNull(),
        menu_item: text("menu_item").notNull()
    
    })

    // order menu item table
    export const orderMenuItemTable = pgTable("order_menu_item",{
        id : serial("id").primaryKey(),
        order_id : integer("order_id").notNull().references(()=> OrdersTable.id,{ onDelete:"cascade"}),
        menu_item_id : integer("menu_item_id").notNull().references(()=> menu_itemTable.id,{ onDelete:"cascade"}),
        quantity: integer("quantity").notNull(),
        item_price: integer("price").notNull()
        

    })

    //order status table
    export const OrderStatusTable = pgTable("order_status",{
        id : serial("id").primaryKey(),
        order_id : integer("order_id").notNull().references(()=> OrdersTable.id,{ onDelete:"cascade"}),
        status_catalog_id : integer("status_catalog_id").notNull().references(()=> statusCatalogTable.id,{ onDelete:"cascade"}),
        created_at : integer("created_at").notNull(),
        order: text("order").notNull()
    })


    //status catalog table
    export const statusCatalogTable = pgTable("status_catalog",{
        id : serial("id").primaryKey(),
        name : text("name").notNull(),
        order_status : text("description").notNull()
    })
        

    ///////
     //Restraunt owner relationships
     export const RestrauntOwnerRelationss = relations(restrauntownerTable,({one}) => ({
        restraunt : one(RestrauntTable,{
            fields: [restrauntownerTable.id],
            references: [RestrauntTable.id]
        }),
         Users:one (UsersTable,{
             fields: [restrauntownerTable.id],
            references: [UsersTable.id]
           })
    }));

    //restraunt relationship
    export const RestrauntRelationship = relations(RestrauntTable,({one,many}) => ({
        restraunt:many(restrauntownerTable),
        city_id : one(cityTable,{fields: [RestrauntTable.id],references: [cityTable.id]})
    }));
  ////menu_item Relationship
  export const Menu_itemRelationss = relations(menu_itemTable,({one}) => ({
    restraunt : one(RestrauntTable,{fields: [menu_itemTable.id],references: [RestrauntTable.id]}),
     category:one (categoryTable,{fields: [menu_itemTable.id],references: [categoryTable.id]})
}));
    ///city relationship
    export const cityRelationship = relations(cityTable,({one}) => ({
        state : one(stateTable,{ fields: [cityTable.id], references: [stateTable.id]})
    }));

    //user relationship
    export const userRelationship = relations(UsersTable,({one,many}) =>({
        owner:one (restrauntownerTable,{fields:[UsersTable.id], references:[restrauntownerTable.ownerid]})
    }));


 
            




     export type TIRestraunt = typeof RestrauntTable.$inferInsert;
     export type TSRestraunt = typeof RestrauntTable.$inferSelect;
    export type TIProfile = typeof menu_itemTable.$inferInsert;
    export type TSProfile = typeof menu_itemTable.$inferSelect;
    export type TIUser = typeof UsersTable.$inferInsert;
    export type TSUser = typeof UsersTable.$inferSelect;
    export type TIaddress = typeof addressTable.$inferInsert;
    export type TSaddress = typeof addressTable.$inferSelect;
    export type TIcategory = typeof categoryTable.$inferInsert;
    export type TScategory = typeof categoryTable.$inferSelect;
    export type TIcity = typeof cityTable.$inferInsert;
    export type TScity = typeof cityTable.$inferSelect;
    export type TIcomment = typeof commentTable.$inferInsert;
    export type TScomment = typeof commentTable.$inferSelect;
    export type TIdriver = typeof driverTable.$inferInsert;
    export type TSdriver = typeof driverTable.$inferSelect;
    export type TImenu_item = typeof menu_itemTable.$inferInsert;
    export type TSmenu_item = typeof menu_itemTable.$inferSelect;
    export type TIorder_menu_item = typeof orderMenuItemTable.$inferInsert;
    export type TSorder_menu_item = typeof orderMenuItemTable.$inferSelect;
    export type TIOrderStatus = typeof OrderStatusTable.$inferInsert;
    export type TSOrderStatus = typeof OrderStatusTable.$inferSelect;
    export type TIOrders = typeof OrdersTable.$inferInsert;
    export type TSOrders = typeof OrdersTable.$inferSelect;
    export type TIrestrauntowner = typeof restrauntownerTable.$inferInsert;
    export type TSrestrauntowner = typeof restrauntownerTable.$inferSelect;
    export type TIstate = typeof stateTable.$inferInsert;
    export type TSstate = typeof stateTable.$inferSelect;
    export type TIstatusCatalog = typeof statusCatalogTable.$inferInsert;
    export type TSstatusCatalog = typeof statusCatalogTable.$inferSelect;
    export type TIAuthOnUser = typeof AuthOnUsersTable.$inferInsert;
    export type TSAuthOnUser = typeof AuthOnUsersTable.$inferSelect;

   

    
