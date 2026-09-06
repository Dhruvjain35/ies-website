import Link from "next/link";
import Image from "next/image";
import { MOTIFS, type MotifName } from "./visuals/Motifs";

type Props = {
  /** Small coloured category label above the headline. */
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  /** Action text, rendered as the underlined link at the foot of the tile. */
  action?: string;
  /**
   * Artwork. Pass `image` to use a real photograph from /public; otherwise the
   * named motif is drawn. Swapping a tile to a photo is a one-line change.
   */
  motif?: MotifName;
  image?: string;
  /** Taller artwork area, for tiles that lead a section. */
  tall?: boolean;
  priority?: boolean;
};

export default function FeatureTile({
  eyebrow,
  title,
  description,
  href,
  action = "Read more",
  motif = "growth",
  image,
  tall = false,
  priority = false,
}: Props) {
  const Motif = MOTIFS[motif];

  return (
    <Link href={href} className="group flex flex-col border border-border hover:border-gold/40 transition-colors">
      <div className={`relative overflow-hidden ${tall ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
            <Motif />
          </div>
        )}
        {/* Keeps the headline legible over either artwork */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-obsidian/80 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
          {eyebrow}
        </span>
        <h3 className="mt-2.5 font-serif text-xl sm:text-2xl font-bold text-arch-white leading-snug group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
        <span className="mt-5 inline-block text-[11px] font-bold uppercase tracking-widest text-arch-white border-b border-gold pb-1 self-start group-hover:text-gold transition-colors">
          {action}
        </span>
      </div>
    </Link>
  );
}
