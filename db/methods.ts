import { desc, eq } from "drizzle-orm"
import { db } from "./index"
import { posts, users } from "./schema"

export const getPosts = async () => {
    const selectResult = await db.select().from(posts).orderBy(desc(posts.createdAt))
    return selectResult
}


export async function getPostsPagination  (page:number= 1, limit:number= 2)  {    
    const skip = (page - 1) * limit
    try {
        const dbPosts = await db.select()
	    .from(posts)
	    .orderBy(desc(posts.createdAt))
	    .limit(limit)
	    .offset(skip)

        console.log("Good")

        return JSON.parse(JSON.stringify(dbPosts))
    } catch (error) {
        console.log(error)
        return []
    }  
    
} 

export type NewPost = Required<typeof posts.$inferInsert>

export const insertPost = async (post: NewPost) => {
    return db.insert(posts).values(post).returning()
}


export const getUsers = async () => {
    const selectResult = await db.select().from(users)
    return selectResult
}

export const getPostAuthorInfo = async (id: number) => {
    const user = await db.select().from(users).where(eq(users.id, id));
    const {name} = user[0]
    return {name,id}
}

export const getPost =async (id: number) => {
    const post = await db.select().from(posts).where(eq(posts.id, id));
    return post 
}

export type NewUser = typeof users.$inferInsert

export const insertUser = async (User: NewUser) => {
    return db.insert(users).values(User).returning()
}