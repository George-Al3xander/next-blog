import CreatePostForm, { FieldVal } from "@/components/posts/create post form/create-post-form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation"
import { createPost } from "../../../../lib/actions";




const PostCreatePage = async () => {
    const {isAuthenticated, getUser} = await getKindeServerSession()
    const isLogged  = await isAuthenticated()
    if(!isLogged) {
        //redirect("/")
    }


    

    return(<CreatePostForm onSuccess={createPost}/>)    
}

export default PostCreatePage

