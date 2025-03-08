import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { MessageCircle } from "lucide-react";
import { syncUser } from "@/actions/user.action";

async function Navbar() {
    const user = await currentUser();
    if(user) await syncUser(); // POSTS

    return (
     <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="max-w-7xl mx-auto px-4">
         <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-bold font-mono tracking-wider">
              <div className="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <span className="text-white text-xl">ChatFlow</span>
                <MessageCircle className="w-5 h-5 text-white transition" />
              </div>
            </Link>
          </div>

          <DesktopNavbar />
          <MobileNavbar /> 
         </div>
        </div>
    </nav>
 );
}
export default Navbar;
