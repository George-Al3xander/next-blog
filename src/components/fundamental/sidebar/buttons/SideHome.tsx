import Button from "@/components/reusable/Button";
import Link from "next/link";
import { FaHome } from "react-icons/fa";




const SidebarHome = () => (
        <Link className="mx-auto" href={"/"}>
                <Button Icon={FaHome} variant="icon">
                        home
                </Button>
        </Link>
)

export default SidebarHome