import { PitchGraphic, type PitchVariant } from "@/components/PitchGraphic";
import type { QuestionMedia } from "@/lib/tests";

type QuestionMediaSlotProps = {
  media?: QuestionMedia;
  variant: PitchVariant;
};

export function QuestionMediaSlot({ media, variant }: QuestionMediaSlotProps) {
  if (media?.videoSrc) {
    return (
      <figure className="quiz-media">
        <video controls playsInline preload="metadata" poster={media.poster} src={media.videoSrc} />
        {media.caption ? <figcaption>{media.caption}</figcaption> : null}
      </figure>
    );
  }

  return (
    <figure className="quiz-media">
      <PitchGraphic variant={variant} label="Situation diagram" />
      <figcaption>Illustrative diagram · match footage coming soon</figcaption>
    </figure>
  );
}
