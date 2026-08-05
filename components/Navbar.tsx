import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut, Sparkles, Rocket } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-6 py-3.5 bg-white border-b-4 border-black shadow-[0_4px_0_0_rgba(0,0,0,1)] sticky top-0 z-50 font-work-sans">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform">
            <Rocket className="size-5 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-2xl tracking-tight text-black flex items-center gap-1">
              STARTUP<span className="text-primary-100 font-black">HUB</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/60 -mt-1">
              YC Directory & Pitches
            </span>
          </div>
        </Link>

        {/* User Actions */}
        <div className="flex items-center gap-4 text-black">
          {session && session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="flex items-center gap-2 font-extrabold text-sm px-4 py-2 bg-primary border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
              >
                <BadgePlus className="size-5" />
                <span className="max-sm:hidden uppercase tracking-wider">Submit Pitch</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="flex items-center gap-1.5 font-bold text-sm px-3.5 py-2 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-all"
                  title="Logout"
                >
                  <LogOut className="size-4" />
                  <span className="max-sm:hidden">Logout</span>
                </button>
              </form>

              <Link href={`/user/${session?.id}`} className="group relative">
                <Avatar className="size-10 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback className="bg-primary font-bold text-black">
                    {session?.user?.name ? session.user.name.substring(0, 2).toUpperCase() : "AV"}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button
                type="submit"
                className="flex items-center gap-2 font-black text-sm uppercase tracking-wider px-5 py-2.5 bg-black text-white rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,214,0,1)] hover:bg-primary hover:text-black transition-all"
              >
                <Sparkles className="size-4 text-yellow-300" />
                <span>Login with GitHub</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
