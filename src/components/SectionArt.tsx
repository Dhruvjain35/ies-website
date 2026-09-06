import { BANDS, type BandName } from "./visuals/Bands";

/**
 * A full-width band of artwork used to break up long stretches of text.
 * The band art is drawn at 3:1, matching the default aspect, so it fills the
 * frame edge to edge without cropping through the composition.
 */
export default function SectionArt({
  band,
  className = "",
  aspect = "aspect-[3/1]",
}: {
  band: BandName;
  className?: string;
  aspect?: string;
}) {
  const Band = BANDS[band];
  return (
    <div className={`relative overflow-hidden border border-border ${aspect} ${className}`}>
      <Band />
    </div>
  );
}
