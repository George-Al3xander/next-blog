import {  Meta } from "@/types/type_posts"
import { compileMDX}from "next-mdx-remote/rsc"
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'





export const compileFromMdx = async (source: string)  => {
    const {frontmatter, content} = await compileMDX<Meta>({
        source,     
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    //@ts-ignore
                    rehypeHighlight,
                    rehypeSlug,
                    [rehypeAutolinkHeadings, {
                        behavior: "wrap"
                    }]
                ]
            }
        }
    })

    return {frontmatter, content}
} 