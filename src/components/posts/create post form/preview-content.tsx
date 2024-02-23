import { UseFormWatch } from "react-hook-form";
import { FieldVal } from "./create-post-form";
import { Suspense } from "react";
import DisplayMarkdown from "@/components/display-markdown";




export default function PreviewContent({watch}:{watch: UseFormWatch<FieldVal>}) {
    const content = watch("content");

    return(<Suspense fallback={<div>Converting...</div>}>
        <DisplayMarkdown markdown={content}/>
    </Suspense>)
}