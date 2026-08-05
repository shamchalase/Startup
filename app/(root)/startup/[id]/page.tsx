import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import BookmarkButton from "@/components/BookmarkButton";
import ShareButton from "@/components/ShareButton";
import UpvoteButton from "@/components/UpvoteButton";
import { Sparkles, Calendar, Tag } from "lucide-react";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [post, editorData] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks-new" }),
  ]);

  if (!post) return notFound();

  const editorPosts = editorData?.select || [];
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      {/* Header Section */}
      <section className="pink_container !min-h-[280px]">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1.5 bg-black text-white font-extrabold text-xs px-4 py-1.5 rounded-full border-2 border-white uppercase tracking-wider">
            <Calendar className="size-3.5 text-yellow-300" />
            {formatDate(post?._createdAt)}
          </span>
          <span className="flex items-center gap-1 bg-white text-black font-extrabold text-xs px-3 py-1.5 rounded-full border-2 border-black uppercase tracking-wider">
            <Tag className="size-3.5 text-primary-100" />
            {post.category}
          </span>
        </div>

        <h1 className="heading max-w-4xl">{post.title}</h1>
        <p className="sub-heading !max-w-4xl">{post.description}</p>
      </section>

      {/* Content Section */}
      <section className="section_container">
        {/* Banner Image with Actions */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur p-2 rounded-full border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <BookmarkButton startupId={id} title={post.title} />
            <ShareButton startupId={id} title={post.title} />
          </div>
        </div>

        <div className="space-y-6 mt-10 max-w-4xl mx-auto">
          {/* Author Card & Upvote Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-yellow-50 border-3 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-3 items-center group"
            >
              <Image
                src={post.author?.image || "/avatar.png"}
                alt="avatar"
                width={56}
                height={56}
                className="rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform"
              />

              <div>
                <p className="text-18-bold font-extrabold text-black group-hover:text-primary transition-colors">
                  {post.author?.name}
                </p>
                <p className="text-xs font-bold text-black/60">
                  @{post.author?.username || "founder"}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <UpvoteButton startupId={id} initialUpvotes={12} />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <Sparkles className="size-6 text-primary-100" />
            <h3 className="text-30-bold">The Pitch Overview</h3>
          </div>

          {parsedContent ? (
            <article
              className="prose prose-lg max-w-4xl font-work-sans bg-white p-6 md:p-8 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] break-words leading-relaxed text-black/90"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No pitch details provided.</p>
          )}
        </div>

        <hr className="divider" />

        {/* Editor Picks / Recommended Startups */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-30-semibold flex items-center gap-2 mb-6">
            <Sparkles className="size-6 text-yellow-500" /> Recommended Pitches
          </h3>

          {editorPosts?.length > 0 ? (
            <ul className="card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          ) : (
            <p className="text-black/60 font-medium italic">
              Explore more startup pitches on the home feed!
            </p>
          )}
        </div>

        {/* Suspense for View Counter */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
