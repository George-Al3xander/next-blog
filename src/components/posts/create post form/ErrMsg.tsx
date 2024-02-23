import { FieldError, FieldErrors} from "react-hook-form";
import { FieldVal } from "./create-post-form";

export  function ErrMsg ({errors,path}: {errors: FieldErrors<FieldVal>, path: "title" | "content" | "tags"})  {
    
    if(errors[path]) {
        return(<p className="text-red-600">{errors[path]!.message}</p>)
    }    
}