import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache"; // Ensures live updates

async function DesktopNavbar() {
  // Fetch the latest user data from Clerk
  const user = await currentUser();
  const username = user?.username ?? user?.emailAddresses?.[0]?.emailAddress.split("@")[0];
  const profileImage = user?.imageUrl || "/avatar.png"; // Get the latest profile image

  // Revalidate the profile page to reflect updates quickly
  revalidatePath(`/profile/${username}`);

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button 
        variant="ghost" 
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white" 
        asChild
      >
        <Link href="/">
          <HomeIcon className="w-4 h-4 text-white hover:text-white" />
          <span className="hidden lg:inline text-white hover:text-white">Home</span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white" 
            asChild
          >
            <Link href="/notifications">
              <BellIcon className="w-4 h-4 text-white hover:text-white" />
              <span className="hidden lg:inline text-white hover:text-white">Notifications</span>
            </Link>
          </Button>

          <Button 
            variant="ghost" 
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white hover:text-white" 
            asChild
          >
            <Link
              href={`/profile/${
                user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4 text-white" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <UserButton />
        </>
      ) : (
        <SignInButton mode="modal">
          <Button 
            variant="default" 
            className="bg-blue-500 text-white hover:bg-blue-700"
          >
            Sign In
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
