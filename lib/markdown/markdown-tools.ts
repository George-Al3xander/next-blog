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


export function markdownToPlainText(markdownText: string) {
    // Remove headers (e.g., ## Header)
    markdownText = markdownText.replace(/#{1,6}\s/g, '');
  
    // Remove bold and italic formatting (e.g., **bold**, *italic*)
    markdownText = markdownText.replace(/(\*\*|__)(.*?)\1/g, '$2');
    markdownText = markdownText.replace(/(\*|_)(.*?)\1/g, '$2');
  
    // Remove links (e.g., [text](url))
    markdownText = markdownText.replace(/\[([^\]]+)\]\((.*?)\)/g, '$1');
  
    // Remove images (e.g., ![alt text](url))
    markdownText = markdownText.replace(/!\[([^\]]+)\]\((.*?)\)/g, '');
  
    // Remove code blocks (e.g., ``` code ```)
    markdownText = markdownText.replace(/```[^]+?```/g, '');
  
    // Remove inline code (e.g., `code`)
    markdownText = markdownText.replace(/`([^`]+)`/g, '$1');
  
    // Remove unordered lists
    markdownText = markdownText.replace(/^\s*[-+*]\s/gm, '');
  
    // Remove ordered lists
    markdownText = markdownText.replace(/^\s*\d+\.\s/gm, '');
  
    // Remove blockquotes (e.g., > quote)
    markdownText = markdownText.replace(/^\s*>/gm, '');
  
    return markdownText;
  }