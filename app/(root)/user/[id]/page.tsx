import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";
import { ShieldCheck, Rocket } from "lucide-react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />

          <div className="flex items-center gap-1 mt-4 bg-black text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="size-3.5 text-yellow-400" />
            <span>Verified Founder</span>
          </div>

          <p className="text-30-extrabold mt-4 text-center">
            @{user?.username}
          </p>
          <p className="mt-2 text-center text-14-normal max-w-xs">
            {user?.bio || "Entrepreneur & Startup Pitcher"}
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <div className="flex items-center gap-3 border-b-3 border-black pb-3">
            <Rocket className="size-7 text-primary-100" />
            <h2 className="text-30-bold">
              {session?.id === id ? "Your Submitted Pitches" : `${user.name}'s Pitches`}
            </h2>
          </div>

          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
