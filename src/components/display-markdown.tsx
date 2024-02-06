import { compileFromMdx } from "../../lib/markdown/markdown-tools";
import 'highlight.js/styles/github-dark.css'


const DisplayMarkdown = async ({markdown}:{markdown:string}) => {
    const {content} = await compileFromMdx(markdown);

    return(<article className="
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
    ">{content} </article>)
}

export default DisplayMarkdown