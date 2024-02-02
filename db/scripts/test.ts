import { getPosts } from "../methods"





const main = async () => {

    const res = await getPosts()

    console.log(res)

}

main()