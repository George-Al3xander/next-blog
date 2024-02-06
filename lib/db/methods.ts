import { count, desc, eq, sql } from "drizzle-orm"
import { db } from "./index"
import { posts, users } from "./schema"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const getPosts = async () => {
    const selectResult = await db.select().from(posts).orderBy(desc(posts.createdAt))
    return selectResult
}


export async function getPostsPagination  (page:number= 1, limit:number= 5)  {    
    const skip = (page - 1) * limit
    try {
        const dbPosts = await db.select()
	    .from(posts)
	    .orderBy(desc(posts.createdAt))
	    .limit(limit)
	    .offset(skip)       

        return JSON.parse(JSON.stringify(dbPosts))
    } catch (error) {
        console.log(error)
        return []
    }  
    
} 

export type NewPost = Required<typeof posts.$inferInsert>

//Omit<, "createdAt" | "updatedAt" | "id"> & {createdAt?: string, updatedAt?: string, id?: number}

export const insertPost = async (post: Omit<NewPost, "createdAt" | "updatedAt" | "id"> ) => {
    return db.insert(posts).values(post).returning()
}


export const getPostsCount = async (userId?: number) => {
    if(userId) {
        return (await db.select({ value: count(posts.id) }).from(posts).where(eq(posts.authorId, userId)))[0].value;
    } else {
        return (await db.select({ value: count(posts.id) }).from(posts))[0].value;
    }     
}


export type NewUser =  Required<typeof users.$inferInsert>

export const getUsers = async () : Promise<NewUser[]> => {
    const selectResult = await db.select().from(users)
    return selectResult
}

export const getUser = async ({kindeId, email}:{kindeId?: string, email?: string}) : Promise<NewUser[]> => {
    if(kindeId) {
        return await db.select().from(users).where(eq(users.kindeId, kindeId))
    } 
   
    return await db.select().from(users).where(eq(users.email, email!)) 
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



export const insertUser = async (User: NewUser) => {
    return db.insert(users).values(User).returning()
}