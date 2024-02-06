"use client"
import { TagsInput as Tag } from "react-tag-input-component";
import { useEffect, useState } from "react"
import toast from 'react-hot-toast';



const TagsInput = () => {
    const [selected, setSelected] = useState<string[]>([]);
    useEffect(() => {
      if(selected && selected.length > 3) {      
          setSelected((prev) => prev.slice(0,3))
          toast.error("You can't have more than 3 tags"); 
      }
    },[selected])
  
   
    return (
      <div className="bg-accent">           
        <Tag
          value={selected}
          onChange={setSelected}
          name="tags"
          classNames={{input: "!bg-accent tags-enter-input"}}
          placeHolder="Enter tag and press enter...(optional)"
        />   
      </div>
    );
  };


export default TagsInput