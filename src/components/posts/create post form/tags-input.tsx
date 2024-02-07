"use client"
import { TagsInput as Tag } from "react-tag-input-component";
import {MutableRefObject, useState } from "react"
import toast from 'react-hot-toast';



type Props ={ 
    tagsLimit?: number,
    initialTags?: string[],
    tagsRef: MutableRefObject<string[]>
}


const TagsInput = ({tagsLimit = 5, initialTags = [],tagsRef}: Props) => {
    const [selected, setSelected] = useState<string[]>(initialTags);
    const handleChange = (tags: string[]) => {
      tagsRef.current = tags
      setSelected(tags)
    }
    return (
      <div className="bg-accent" onClick={(e) => e.preventDefault()}>         
        <Tag          
          beforeAddValidate={(newTag, prevTags) => {
            if([newTag, ...prevTags].length > tagsLimit) {
              toast.error(`You can't have more than ${tagsLimit} tag${tagsLimit == 1 ? "": "s"}`); 
              return false
            }
            return true
          }}
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