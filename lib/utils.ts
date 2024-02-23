import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Filter  from 'bad-words'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkProfanity(input: string | string[]) : boolean {
  const filter = new Filter()

  if(typeof input === "string") {
    return filter.isProfane(input)
  }
  
  return filter.isProfane(JSON.stringify(input))
}

