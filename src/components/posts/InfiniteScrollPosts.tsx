"use client"
import {useInView} from "react-intersection-observer"
import { useEffect, useState } from "react"
import { NewPost } from "../../../db/methods"

import PostPreview from "./PostPreview";
import Button from "../reusable/Button";
import { getPostsAction } from "../../../db/actions";


export default function InfiniteScrollPosts ({initialPosts}: {initialPosts: NewPost[]}) {
  const [posts, setPosts] = useState<NewPost[]>(initialPosts);
  const [page,setPage] = useState<number>(1)
  //const [ref, inView] = useInView();

  const  loadMorePosts = async () => {  
    alert("Help")
    const next = page + 1;    
    const newPosts = await getPostsAction(next)
    if(newPosts.length) {
      setPage(next);
      setPosts((prev) => [
        ...(prev.length ? prev : []),
        ...newPosts
      ])
    } 
  }

  // useEffect(() => {
  //   if(inView) {
  //     loadMorePosts()
  //   }
  // },[inView])

  return(<div>
    {posts.map((post) => {
        return <PostPreview key={"post-preview-"+post.id} {...post}/>
    })}
    <Button onClick={loadMorePosts}>Load more</Button>    
  </div>)
}