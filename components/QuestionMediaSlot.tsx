import type { QuestionMedia } from "@/lib/tests";

type QuestionMediaSlotProps = {
  media?: QuestionMedia;
  phase: string;
  index: number;
  total: number;
};

export function QuestionMediaSlot({ media, phase, index, total }: QuestionMediaSlotProps) {
  const caption = media?.caption ?? "Diagrama / vídeo da situação — em breve";

  if (media?.videoSrc) {
    return (
      <figure className="quiz-media">
        <video
          className="quiz-media__video"
          controls
          playsInline
          preload="metadata"
          poster={media.poster}
          src={media.videoSrc}
        />
        <figcaption className="quiz-media__caption">{caption}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="quiz-media quiz-media--placeholder">
      <div className="quiz-media__diagram" aria-hidden="true">
        <span className="quiz-media__phase">{phase}</span>
        <span className="quiz-media__count">
          {index + 1}/{total}
        </span>
      </div>
      <figcaption className="quiz-media__caption">{caption}</figcaption>
    </figure>
  );
}
