import Button from "@/components/reusable/Button";
import Link from "next/link";
import { IoSearch  } from "react-icons/io5";




const SidebarSearch = () => (
    <Link className="mx-auto" href={"/search"}>
        <Button Icon={IoSearch} variant="icon">
                    search
        </Button>
    </Link>
)

export default SidebarSearch