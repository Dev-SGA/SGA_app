"use client";

import { useRef, useState } from "react";

type HeroVideoProps = {
  poster?: string;
  videoSrc?: string;
  caption?: string;
};

/** Hero video slot — set `videoSrc` under public/media when ready. */
export function HeroVideo({
  poster = "/media/hero-poster.jpg",
  videoSrc,
  caption = "See the game through the SGA tactical lens.",
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
          <div className="hero-video__placeholder" role="img" aria-label="Tactical video preview — coming soon">
            <span className="hero-video__placeholder-icon" aria-hidden="true">
              ▶
            </span>
            <p>Intro video in production</p>
          </div>
        )}
        <figcaption className="hero-video__caption">
          <span>{caption}</span>
          {videoSrc ? (
            <button type="button" className="hero-video__play" onClick={togglePlay}>
              {playing ? "Pause" : "Play video"}
            </button>
          ) : (
            <span className="hero-video__soon">Coming soon</span>
          )}
        </figcaption>
      </figure>
    </div>
  );
}
