import { relations } from "drizzle-orm";
import { pgTable, serial, varchar, text, integer, decimal, date, timestamp, boolean } from "drizzle-orm/pg-core";
import { pgEnum } from 'drizzle-orm/pg-core';






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
}));
// Restaurant Table
export const RestrauntTable = pgTable('restaurant', {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    street_address: varchar("street_address", { length: 255 }).notNull(),
    zip_code: varchar("zip_code", { length: 50 }).notNull(),
    city_id: integer("city_id").references(() => cityTable.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow(),
});

// Address Table
export const addressTable = pgTable("address", {
    id: serial('id').primaryKey(),
    street_address_1: varchar('street_address_1', { length: 255 }).notNull(),
    street_address_2: varchar('street_address_2', { length: 255 }),
    zip_code: varchar("zip_code", { length: 50 }).notNull(),
    delivery_instructions: text("delivery_instructions"),
    user_id: integer("user_id"),
    city_id: integer("city_id"),  //.references(() => cityTable.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

// Category Table
export const categoryTable = pgTable('category', {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
});

// City Table
export const cityTable = pgTable('city', {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    state_id: integer("state_id").references(() => stateTable.id, { onDelete: "cascade" }),
});

// Comment Table
export const commentTable = pgTable('comment', {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").references(() => OrdersTable .id, { onDelete: "cascade" }),
    user_id: integer("user_id").references(() => UsersTable.id, { onDelete: "cascade" }),
    comment_text: text("comment_text").notNull(),
    is_complaint: boolean("is_complaint").default(false),
    is_praise: boolean("is_praise").default(false),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

// Driver Table
export const driverTable = pgTable('driver', {
    id: serial("id").primaryKey(),
    car_make: varchar("car_make", { length: 255 }).notNull(),
    car_model: varchar("car_model", { length: 255 }).notNull(),
    car_year: integer("car_year").notNull(),
    user_id: integer("user_id").references(() => UsersTable.id, { onDelete: "cascade" }),
    online: boolean("online").default(false),
    delivering: boolean("delivering").default(false),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

// MenuItem Table
export const menu_itemTable = pgTable('menu_item', {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    restaurant_id: integer("restaurant_id").references(() => RestrauntTable.id, { onDelete: "cascade" }),
    category_id: integer("category_id").references(() => categoryTable.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
    ingredients: text("ingredients").notNull(),
    price: decimal("price").notNull(),
    active: boolean("active").default(true),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

// OrderMenuItem Table
export const orderMenuItemTable = pgTable('order_menu_item', {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").references(() => OrdersTable .id, { onDelete: "cascade" }),
    menu_item_id: integer("menu_item_id").references(() => menu_itemTable.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    item_price: decimal("item_price").notNull(),
    price: decimal("price").notNull(),
    comment: text("comment"),
});

// OrderStatus Table
export const OrderStatusTable = pgTable('order_status', {
    id: serial("id").primaryKey(),
    order_id: integer("order_id").references(() => OrdersTable .id, { onDelete: "cascade" }),
    status_catalog_id: integer("status_catalog_id").references(() => statusCatalogTable.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at").defaultNow(),
});

// Orders Table
export const OrdersTable  = pgTable('orders', {
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").references(() => RestrauntTable.id, { onDelete: "cascade" }),
    estimated_delivery_time: timestamp("estimated_delivery_time"),
    actual_delivery_time: timestamp("actual_delivery_time"),
    delivery_address_id: integer("delivery_address_id").references(() => addressTable.id, { onDelete: "cascade" }),
    user_id: integer("user_id").references(() => UsersTable.id, { onDelete: "cascade" }),
    driver_id: integer("driver_id").references(() => driverTable.id, { onDelete: "cascade" }),
    price: decimal("price").notNull(),
    discount: decimal("discount"),
    final_price: decimal("final_price").notNull(),
    comment: text("comment"),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

// State Table
export const stateTable = pgTable('state', {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 10 }).notNull(),
});

// StatusCatalog Table
export const statusCatalogTable = pgTable('status_catalog', {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
});



// Users Table
export const UsersTable = pgTable('users', {
    id:serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    contact_phone: varchar("contact_phone", { length: 20 }),
    phone_verified: boolean("phone_verified").default(false),
    email: varchar("email", { length: 255 }).notNull(),
    email_verified: boolean("email_verified").default(false),
    confirmation_code: varchar("confirmation_code", { length: 6 }),
    password: varchar("password", { length: 255 }).notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow(),
});

// RestaurantOwner Table
export const restrauntownerTable = pgTable('restaurant_owner', {
    id: serial("id").primaryKey(),
    restaurant_id: integer("restaurant_id").references(() => RestrauntTable.id, { onDelete: "cascade" }),
    owner_id: integer("owner_id").references(() => UsersTable.id, { onDelete: "cascade" })
});


///////////////////////////////Relationships///////////////////////////////////////////

export const userRelationship = relations(UsersTable, ({ many }) => ({
    restaurantOwners: many(restrauntownerTable),
}));


export const userRestaurantOwnerRelations = relations(restrauntownerTable, ({ one }) => ({
    owner: one(UsersTable, {
        fields: [restrauntownerTable.owner_id],
        references: [UsersTable.id]
    }),
}));

export const restaurantRelations = relations(RestrauntTable, ({ many, one }) => ({
    menuItems: many(menu_itemTable),
    orders: many(OrdersTable ),
    city: one(cityTable, {
        fields: [RestrauntTable.city_id],
        references: [cityTable.id]
    }),
    owners: many(restrauntownerTable)
}));

export const addressRelations = relations(addressTable, ({ one, many }) => ({
    city: one(cityTable, {
        fields: [addressTable.city_id],
        references: [cityTable.id]
    }),
    user: one(UsersTable, {
        fields: [addressTable.user_id],
        references: [UsersTable.id]
    }),
    orders: many(OrdersTable )
}));

// City and Restaurant relationship
export const citiesRelations = relations(cityTable, ({ many }) => ({
    restaurants: many(RestrauntTable)
}));

export const cityRelations = relations(cityTable, ({ many, one }) => ({
    state: one(stateTable, {
        fields: [cityTable.state_id],
        references: [stateTable.id]
    }),
    addresses: many(addressTable),
    restaurants: many(RestrauntTable)
}));

// Category and MenuItem relationship
export const categoryRelations = relations(categoryTable, ({ many }) => ({
    menuItems: many(menu_itemTable)
}));

export const commentRelations = relations(commentTable, ({ one }) => ({
    order: one(OrdersTable , {
        fields: [commentTable.order_id],
        references: [OrdersTable .id]
    }),
    user: one(UsersTable, {
        fields: [commentTable.user_id],
        references: [UsersTable.id]
    })
}));

export const driverRelations = relations(driverTable, ({ one, many }) => ({
    user: one(UsersTable, {
        fields: [driverTable.user_id],
        references: [UsersTable.id]
    }),
    orders: many(OrdersTable )
}));

export const menuItemRelations = relations(menu_itemTable, ({ one, many }) => ({
    restaurant: one(RestrauntTable, {
        fields: [menu_itemTable.restaurant_id],
        references: [RestrauntTable.id]
    }),
    category: one(categoryTable, {
        fields: [menu_itemTable.category_id],
        references: [categoryTable.id]
    }),
    orderMenuItems: many(orderMenuItemTable)
}));

export const orderMenuItemRelations = relations(orderMenuItemTable, ({ one }) => ({
    menuItem: one(menu_itemTable, {
        fields: [orderMenuItemTable.menu_item_id],
        references: [menu_itemTable.id]
    }),
    order: one(OrdersTable , {
        fields: [orderMenuItemTable.order_id],
        references: [OrdersTable .id]
    })
}));

export const orderStatusRelations = relations(OrderStatusTable, ({ one }) => ({
    order: one(OrdersTable , {
        fields: [OrderStatusTable.order_id],
        references: [OrdersTable .id]
    }),
    statusCatalog: one(statusCatalogTable, {
        fields: [OrderStatusTable.status_catalog_id],
        references: [statusCatalogTable.id]
    })
}));

export const orderRelations = relations(OrdersTable , ({ one, many }) => ({
    restaurant: one(RestrauntTable, {
        fields: [OrdersTable .restaurant_id],
        references: [RestrauntTable.id]
    }),
    deliveryAddress: one(addressTable, {
        fields: [OrdersTable .delivery_address_id],
        references: [addressTable.id]
    }),
    user: one(UsersTable, {
        fields: [OrdersTable .user_id],
        references: [UsersTable.id]
    }),
    driver: one(driverTable, {
        fields: [OrdersTable .driver_id],
        references: [driverTable.id]
    }),
    comments: many(commentTable),
    orderMenuItems: many(orderMenuItemTable),
    orderStatuses: many(OrderStatusTable)
}));

export const restaurantOwnerRelations = relations(restrauntownerTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [restrauntownerTable.owner_id],
        references: [UsersTable.id]
    }),
    restaurant: one(RestrauntTable, {
        fields: [restrauntownerTable.restaurant_id],
        references: [RestrauntTable.id]
    })
}));

export const stateRelations = relations(stateTable, ({ many }) => ({
    cities: many(cityTable)
}));

export const statusCatalogRelations = relations(statusCatalogTable, ({ many }) => ({
    orderStatuses: many(OrderStatusTable)
}));

export const userRelations = relations(UsersTable, ({ many }) => ({
    addresses: many(addressTable),
    comments: many(commentTable),
    drivers: many(driverTable),
    orders: many(OrdersTable ),
    restaurantOwners: many(restrauntownerTable)
}));

// Types
export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;
export type TIaddress = typeof addressTable.$inferInsert;
export type TSaddress = typeof addressTable.$inferSelect;
export type TIcity = typeof cityTable.$inferInsert;
export type TScity = typeof cityTable.$inferSelect;
export type TIstate = typeof stateTable.$inferInsert;
export type TSstate = typeof stateTable.$inferSelect;
export type TIRestraunt = typeof RestrauntTable.$inferInsert;
export type TSRestraunt = typeof RestrauntTable.$inferSelect;
export type TIcategory = typeof categoryTable.$inferInsert;
export type TScategory = typeof categoryTable.$inferSelect;
export type TImenu_item = typeof menu_itemTable.$inferInsert;
export type TSmenu_item = typeof menu_itemTable.$inferSelect;
export type TIOrders = typeof OrdersTable .$inferInsert;
export type TSOrders = typeof OrdersTable .$inferSelect;
export type TIorder_menu_item = typeof orderMenuItemTable.$inferInsert;
export type TSorder_menu_item = typeof orderMenuItemTable.$inferSelect;
export type TIOrderStatus = typeof OrderStatusTable.$inferInsert;
export type TSOrderStatus = typeof OrderStatusTable.$inferSelect;
export type TIstatusCatalog = typeof statusCatalogTable.$inferInsert;
export type TSstatusCatalog = typeof statusCatalogTable.$inferSelect;
export type TIcomment = typeof commentTable.$inferInsert;
export type TScomment = typeof commentTable.$inferSelect;
export type TIdriver = typeof driverTable.$inferInsert;
export type TSdriver = typeof driverTable.$inferSelect;
export type TIrestrauntowner = typeof restrauntownerTable.$inferInsert;
export type TSrestrauntowner = typeof restrauntownerTable.$inferSelect;
export type TIAuthOnUser = typeof AuthOnUsersTable.$inferInsert;
export type TSAuthOnUser = typeof AuthOnUsersTable.$inferSelect;