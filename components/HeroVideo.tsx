"use client";

import { useRef, useState } from "react";

type HeroVideoProps = {
  poster?: string;
  videoSrc?: string;
  caption?: string;
};

/** Slot de vídeo hero — preencher `videoSrc` em public/media quando disponível. */
export function HeroVideo({
  poster = "/media/hero-poster.jpg",
  videoSrc,
  caption = "Veja o jogo pela lente tática SGA.",
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    const el = videoRef.current;
    if (!el || !videoSrc) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="hero-video">
      <figure className="hero-video__frame">
        {videoSrc ? (
          <video
            ref={videoRef}
            className="hero-video__el"
            loop
            muted
            playsInline
            preload="metadata"
            poster={poster}
            src={videoSrc}
          />
        ) : (
          <div className="hero-video__placeholder" role="img" aria-label="Prévia tática em vídeo — em breve">
            <span className="hero-video__placeholder-icon" aria-hidden="true">
              ▶
            </span>
            <p>Vídeo introdutório em produção</p>
          </div>
        )}
        <figcaption className="hero-video__caption">
          <span>{caption}</span>
          {videoSrc ? (
            <button type="button" className="hero-video__play" onClick={togglePlay}>
              {playing ? "Pausar" : "Reproduzir vídeo"}
            </button>
          ) : (
            <span className="hero-video__soon">Em breve</span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
