"use server"
import { getPostsPagination } from "./methods"

export async function getPostsAction  (page:number= 1)  {  
	
    const posts = await getPostsPagination(page)

	return posts
} 