"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { getPostsPagination, getUser, insertPost } from "./db/methods"
import { FieldVal } from "@/components/posts/create post form/create-post-form"

export async function getPostsAction  (page:number= 1)  {  
	
    const posts = await getPostsPagination(page)

	return posts
} 



export const isCurrUserAuthor = async (authorId: number): Promise<boolean> => {    
    const {isAuthenticated, getUser: getKindeUser} = await getKindeServerSession()
    
    const isLogged  = await isAuthenticated()
    if(!isLogged) return false
    
    const user = await getKindeUser();
    if(!user) return false

    const dbUser = await getUser({kindeId: user.id})
    if(dbUser[0].id !== authorId) return false;

    return true
}


export const createPost = async (data:FieldVal) => {    
    const {isAuthenticated, getUser: getKindeUser} = await getKindeServerSession()
    const isLogged  = await isAuthenticated()

    try {
        if(!isLogged) throw new Error("Not authenticated")
        const currUser = await getKindeUser();
        const dbUser = (await getUser({kindeId: currUser!.id}))[0]
        await insertPost({authorId: +dbUser.id, title: data.title, content: data.content})
        
        return {success: true} 
    } catch (error) {
        return {success: false,error: error as string | undefined}
    }
}
