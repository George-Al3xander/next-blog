import { notFound } from "next/navigation"
import { getPost} from "../../../../db/methods"
import { compileFromMdx } from "@/lib/markdown/markdown-tools"
import moment from "moment"
import DisplayPostAuthor from "@/components/posts/GetPostAuthor"
import 'highlight.js/styles/github-dark.css'




export default async function SinglePostPage ({params: {postId}}: {params: {postId: string}}) {

    const post = await getPost(Number(postId))

    if(post.length == 0) notFound()

    const {authorId, id, title,createdAt} = post[0]

    const {frontmatter, content} = await compileFromMdx(post[0].content!)

    return(<section  className="        
        prose 
        lg:prose-xl 
        prose-slate 
        prose-headings:text-white
        prose-p:text-white
        prose-ol:text-white
        prose-ul:text-white
        prose-a:text-white
        prose-strong:text-white
        prose-strong:font-extrabold  
        mx-auto    
    " 
    key={"post-page-"+id}>
      <div className="flex flex-col !m-0 pb-14">
            <h1 className="!m-0 !text-primary">{title}</h1>
            <p className="flex flex-col opacity-30 !mb-0 ">
                <span>written by {<DisplayPostAuthor className="!no-underline hover:!underline" authorId={authorId} />}</span>
                <span>on {moment(createdAt).format("ll")}</span>
            </p>           
      </div>
        <article>
            {content}
        </article>
    </section>)
}