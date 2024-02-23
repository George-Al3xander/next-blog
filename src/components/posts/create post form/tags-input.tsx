"use client"
import { TagsInput as Tag } from "react-tag-input-component";
import {MutableRefObject, useState } from "react"
import toast from 'react-hot-toast';
import { checkProfanity } from "../../../../lib/utils";


type Props ={ 
    tagsLimit?: number,
    initialTags?: string[],
    tagsRef: MutableRefObject<string[]>,
    onError?: (errMsg?: string) => void,
    onSuccess?: (params?: {newTag?: string, prevTags?: string[]}) => void
}


const TagsInput = ({tagsLimit = 5, initialTags = [],tagsRef, onError, onSuccess}: Props) => {
    const [selected, setSelected] = useState<string[]>(initialTags);
    
    const handleChange = (tags: string[]) => {
      tagsRef.current = tags
      setSelected(tags)
    }

    const validate = (newTag: string, prevTags: string[]) => {
        if(checkProfanity(newTag)) {
            const msg = `Explicit language`
            toast.error(msg);                    
            if(onError) onError(msg)           
            return false
        }
        
        if([newTag, ...prevTags].length > tagsLimit) {
            const msg = `You can't have more than ${tagsLimit} tag${tagsLimit == 1 ? "": "s"}`
            toast.error(msg); 
            return false
        }
        if(onSuccess) onSuccess({newTag, prevTags})
        return true
    }
    
    return (
      <div className="bg-accent" onClick={(e) => e.preventDefault()}>         
        <Tag          
          beforeAddValidate={validate}
          value={selected}
          onChange={handleChange}
          name="tags"
          classNames={{input: "!bg-accent tags-enter-input", tag: "!text-accent"}}
          placeHolder="Enter tag and press enter"
        />                 
      </div>
    );
  };


export default TagsInput