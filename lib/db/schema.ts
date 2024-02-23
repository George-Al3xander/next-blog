import { date, integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

// declaring enum in database
export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);

// export const countries = pgTable('countries', {
//   id: serial('id').primaryKey(),
//   name: varchar('name', { length: 256 }),
// }, (countries) => {
//   return {
//     nameIndex: uniqueIndex('name_idx').on(countries.name),
//   }
// });

// // export const cities = pgTable('cities', {
// //   id: serial('id').primaryKey(),
// //   name: varchar('name', { length: 256 }),
// //   countryId: integer('country_id').references(() => countries.id),
// //   popularity: popularityEnum('popularity'),
// // });

//first users register date - 2024-01-01T06:37:23+0200
export const users = pgTable("users",{
  id: serial('id').primaryKey(),
  kindeId: varchar('kindeId', { length: 256 }).unique(),
  name: varchar("name",{length: 50}).notNull(),  
  email: varchar('email', { length: 256 }).unique(),
  //createdAt: timestamp("createdAt").defaultNow().notNull(),  
})

export const posts = pgTable("posts",{
    id: serial('id').primaryKey(),
    content: text('content'),
    title: varchar('title', { length: 60 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: date("updatedAt"),
    authorId: integer('authorId').references(() => users.id).notNull(),  
    //tags: varchar('tags', { length: 256 }),
  })