"use client"
import Link from "next/link";
import { getPostAuthorInfo } from "../../../db/methods";
import {  useEffect, useState } from "react";
type Props = {authorId: number, className?: React.ComponentProps<'div'>['className']}

export default function DisplayPostAuthor ({authorId, className}: Props) {
    const [author, setAuthor] = useState<{name: string, id: number | string} | undefined>()
    const [isLoading,setIsLoading] = useState(false)
    const getAuthor = async () => {
        setIsLoading(true)
        try {
            const author = await getPostAuthorInfo(authorId);
            setAuthor(author)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAuthor()
    },[])

    if(isLoading) return <div className={className}>Loading...</div>

    if(author == undefined) return <p className={className} >Unknown</p>    

    return(<Link className={className} href={"/authors/"+authorId}>{author.name}</Link>)

}