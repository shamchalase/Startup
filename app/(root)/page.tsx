import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import CategoryFilter from "@/components/CategoryFilter";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import { Rocket, TrendingUp, Users, Award, Flame } from "lucide-react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      {/* Hero Banner */}
      <section className="pink_container relative overflow-hidden">
        {/* Decorative Badge */}
        <div className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full border-2 border-white text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] mb-4">
          <Flame className="size-4 text-yellow-400 animate-pulse" />
          <span>Discover & Pitch Next-Gen Startups</span>
        </div>

        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed by Top Investors & Tech Communities.
        </p>

        {/* Search Bar */}
        <SearchForm query={query} />

        {/* Platform Stats Bar */}
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-xl w-full bg-white/90 backdrop-blur border-3 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col items-center border-r-2 border-black/10 pr-2">
            <span className="text-2xl font-black text-black flex items-center gap-1">
              <Rocket className="size-5 text-primary-100" />
              {posts?.length || 0}
            </span>
            <span className="text-[11px] font-bold text-black/70 uppercase">Pitches</span>
          </div>

          <div className="flex flex-col items-center border-r-2 border-black/10 px-2">
            <span className="text-2xl font-black text-black flex items-center gap-1">
              <TrendingUp className="size-5 text-green-600" />
              100%
            </span>
            <span className="text-[11px] font-bold text-black/70 uppercase">Verified</span>
          </div>

          <div className="flex flex-col items-center pl-2">
            <span className="text-2xl font-black text-black flex items-center gap-1">
              <Award className="size-5 text-yellow-600" />
              24/7
            </span>
            <span className="text-[11px] font-bold text-black/70 uppercase">Community</span>
          </div>
        </div>
      </section>

      {/* Category Pills Filtering Section */}
      <section className="bg-yellow-50 border-b-2 border-black py-2">
        <div className="max-w-7xl mx-auto px-4">
          <CategoryFilter />
        </div>
      </section>

      {/* Main Startups Grid */}
      <section className="section_container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-black pb-4 mb-6">
          <div>
            <h2 className="text-30-bold flex items-center gap-2">
              {query ? `Search results for "${query}"` : "Featured Pitches"}
            </h2>
            <p className="text-sm font-medium text-black/60">
              Browse top startup ideas, vote for your favorites, or connect with founders.
            </p>
          </div>

          <span className="self-start sm:self-auto bg-black text-white font-extrabold text-xs px-3 py-1.5 rounded-full border border-black shadow-[2px_2px_0px_0px_rgba(255,214,0,1)]">
            {posts?.length || 0} Startup{posts?.length === 1 ? "" : "s"} Found
          </span>
        </div>

        <ul className="card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white border-4 border-black rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center">
              <div className="bg-yellow-100 p-4 rounded-full border-2 border-black mb-4">
                <Rocket className="size-10 text-black" />
              </div>
              <h3 className="text-2xl font-black text-black">No Startups Found</h3>
              <p className="text-base text-black/70 max-w-md my-2">
                No startup pitches matched your search query "{query}". Try checking another category or submit your own pitch!
              </p>
            </div>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
