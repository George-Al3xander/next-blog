import { revalidatePath } from "next/cache"
import { NewPost, getPosts, insertPost } from "../../lib/db/methods"
import Button from "./Button"




const TestPosts = async () => {
    const data: Required<NewPost>[] = await getPosts()


    const publishNewPost = async (formData: FormData) => {
        "use server"       
        const title = formData.get("title") 
        const content = formData.get("content") 
        await insertPost({
            title: title as string,
            content: content as string,
            authorId: 1
        })
        revalidatePath("/")
    }
   
    return(<div>
        {data.map((post) => <div className="bg-red-600 p-2 my-2" key={post.id+"post"}>        
        <h1>{post.title}</h1>
        <p className="opacity-70">{post.content}</p>
        </div>)}


        <form className="bg-purple-500" action={publishNewPost}>
            <fieldset className="flex flex-col gap-2 text-black">
                <input required minLength={5} type="text" name="title"  placeholder="Title"/>
                <input required minLength={5} type="text" name="content" placeholder="Content"/>
            </fieldset>
            <button>Publish</button>
        </form>
       
    </div>)

}

export default TestPosts