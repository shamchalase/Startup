import { cn, formatDate } from "@/lib/utils";
import { EyeIcon, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";
import BookmarkButton from "./BookmarkButton";
import ShareButton from "./ShareButton";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views = 0,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="startup-card group relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
      <div>
        {/* Top Header */}
        <div className="flex-between gap-2 mb-3">
          <span className="startup-card_date text-xs font-semibold">
            {formatDate(_createdAt)}
          </span>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-yellow-100/80 border border-black/20 px-2.5 py-1 rounded-full text-xs font-bold text-black">
              <EyeIcon className="size-3.5 text-black" />
              <span>{views} views</span>
            </div>
            {_id && (
              <>
                <BookmarkButton startupId={_id} title={title || "Startup"} />
                <ShareButton startupId={_id} title={title || "Startup"} />
              </>
            )}
          </div>
        </div>

        {/* Author & Title */}
        <div className="flex-between items-start mt-2 gap-4">
          <div className="flex-1">
            <Link href={`/user/${author?._id}`}>
              <p className="text-14-normal font-medium text-black/70 hover:text-black line-clamp-1">
                by {author?.name || "Anonymous"}
              </p>
            </Link>
            <Link href={`/startup/${_id}`}>
              <h3 className="text-20-medium font-bold line-clamp-1 hover:text-primary transition-colors mt-0.5">
                {title}
              </h3>
            </Link>
          </div>
          {author?.image && (
            <Link href={`/user/${author?._id}`} className="shrink-0">
              <Image
                src={author.image}
                alt={author?.name || "Author"}
                width={44}
                height={44}
                className="rounded-full border-2 border-black object-cover shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-transform"
              />
            </Link>
          )}
        </div>

        {/* Description & Image */}
        <Link href={`/startup/${_id}`} className="block my-3">
          <p className="startup-card_desc text-sm line-clamp-2 text-black/80">
            {description}
          </p>

          <div className="relative overflow-hidden rounded-[12px] border-2 border-black mt-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <img
              src={image || "/placeholder.png"}
              alt={title || "Startup Image"}
              className="startup-card_img w-full h-[180px] object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {category && (
              <span className="absolute top-2 left-2 bg-black text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/30 shadow">
                {category}
              </span>
            )}
          </div>
        </Link>
      </div>

      {/* Card Footer */}
      <div className="flex-between gap-3 mt-4 pt-3 border-t border-black/10">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <span className="text-xs font-bold uppercase tracking-wide bg-primary-100 text-black px-3 py-1.5 rounded-full border border-black hover:bg-yellow-200 transition-colors">
            #{category}
          </span>
        </Link>
        <Button className="startup-card_btn shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all" asChild>
          <Link href={`/startup/${_id}`}>
            Details
          </Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4, 5].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton h-[380px]" />
      </li>
    ))}
  </>
);

export default StartupCard;
