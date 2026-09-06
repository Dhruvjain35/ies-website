import Image from "next/image";

/**
 * A full-width photograph used to break up a page.
 *
 * Every image on the site is a public-domain work — US federal photography or
 * a pre-1900 government publication. The caption credits the source anyway:
 * public domain removes the legal obligation, not the scholarly one.
 */
export default function ImageBand({
  src,
  alt,
  caption,
  credit,
  aspect = "aspect-[3/1]",
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden border border-border ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 1216px"
          className="object-cover"
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted">
          {caption && <span className="text-text-secondary">{caption}</span>}
          {credit && <span>{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
