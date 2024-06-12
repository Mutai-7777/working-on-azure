   import {z} from 'zod'
   

 //registerUserSchema
 export const registerUserSchema = z.object ({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    role: z.string().optional()
  })
 
  //loginUserSchema
  export const loginUserSchema = z.object ({
    username: z.string(),
    password:  z.string()
  })

  
export const userSchema = z.object({
    id: z.number().int().optional(),
    name: z.string().max(255),
    contact_phone: z.string().max(20).optional().nullable(),
    phone_verified: z.boolean().default(false).optional(),
    email: z.string().email().max(255),
    email_verified: z.boolean().default(false).optional(),
    confirmation_code: z.string().length(6).optional(),
    password: z.string().max(255),
    created_at: z.date().default(new Date()).optional(),
    updated_at: z.date().default(new Date()).optional(),
  });
  
  export const restrauntSchema = z.object({
      name:z.string(),
      street_address:z.string(),
      zip_code:z.number(),
      city_id:z.number(),
      createdAt:z.date().optional().nullable(),
      updatedAt:z.date().optional().nullable(),
      
      })
  
      export const addressSchema = z.object({
          id: z.number().int().optional(),
          street_adddress_1: z.string(),
          street_adddress_2: z.string().optional(),
          zip_code: z.number(),
          delivery_instructions: z.string().optional(),
          user_id: z.number().int(),
          city_id:z.number(),
          created_at:z.date().optional(),
          updated_at:z.date().optional(),
          
  
  
      })
  
  // // To use the validator in your controllers
  // export const validateUser = (data: any) => {
  //   return userSchema.parse(data);
  // };
  
  export const OrdersSchema = z.object({
    id: z.number().int().optional(),
    restaurant_id: z.number().int(),
    estimated_delivery_time: z.date().optional(),
    actual_delivery_time: z.date().optional(),
    delivery_address_id: z.number().int(),
    user_id: z.number().int(),
    driver_id: z.number().int().optional(),
    price: z.number().positive(),
    discount: z.number().positive().optional().nullable(),
    final_price: z.number().positive(),
    comment: z.string().optional().nullable(),
    created_at: z.date().default(new Date()).optional(),
    updated_at: z.date().default(new Date()).optional(),
    
  });
  
  export const categorySchema = z.object({
      id:z.number(),
      name: z.string()
  
  
  });
  
  export const citySchema = z.object({
      id:z.number(),
      name: z.string(),
      state_id:z.number()
  });
  
  export const stateSchema = z.object({
      id:z.number(),
      name: z.string(),
      code:z.string()
  });
  
  
  
  export const commentSchema = z.object({
      id:z.number(),
      order_id:z.number(),
      user_id:z.number(),
      comment_text:z.string(),
      is_complaint:z.boolean(),
      is_praise:z.boolean(),
      created_at:z.date().default(new Date()).optional(),
      updated_at:z.date().default(new Date()).optional()
  });
  
  export const driverSchema = z.object({
      id:z.number(),
      car_make:z.string(),
      car_model:z.string(),
      car_year:z.number(),
      user_id:z.number(),
      online:z.boolean(),
      delivering:z.boolean(),
      created_at:z.date().default(new Date()).optional(),
      updated_at:z.date().default(new Date()).optional()
  
  });
  
  export const menu_itemSchema = z.object({
      id:z.number(),
      name:z.string(),
      restaurant_id:z.number(),
      category_id:z.number(),
      description:z.string(),
      ingredients:z.string(),
      price:z.number(),
      active:z.boolean(),
      created_at:z.date().default(new Date()).optional(),
      updated_at:z.date().default(new Date()).optional()
  
  
  });
  
  export const statusCatalogSchema = z.object({
      id:z.number(),
      name:z.string()
  
  });
  
  
  
  
  
  export const OrderStatusSchema = z.object({
    id: z.number().int().optional(),
    order_id: z.number().int(),
    status_catalog_id: z.number().int(),
    created_at: z.date().default(new Date()).optional(),
  });
  export const  restrauntownerSchema = z.object({
    id: z.number().int().optional(),
    restaurant_id: z.number().int(),
    owner_id: z.number().int()
  });
  
  export const orderMenuItemSchema = z.object({
      id: z.number(),
      order_id:z.number(),
      menu_item_id:z.number(),
      quantity:z.number(),
      item_price:z.number(),
      price:z.number(),
      comment:z.string()
  
  })


 