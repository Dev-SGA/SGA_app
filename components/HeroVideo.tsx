"use client";

import { useRef, useState } from "react";
import { PitchGraphic } from "@/components/PitchGraphic";

type HeroVideoProps = {
  poster?: string;
  /** Set to a file under public/media once the intro video is ready. */
  videoSrc?: string;
};

export function HeroVideo({ poster, videoSrc }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function togglePlay() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      void el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="hero-visual">
      <div className="hero-visual__frame">
        {videoSrc ? (
          <>
            <video ref={videoRef} loop muted playsInline preload="metadata" poster={poster} src={videoSrc} />
            <button type="button" className="hero-visual__play" onClick={togglePlay}>
              {playing ? "Pause" : "Play video"}
            </button>
          </>
        ) : (
          <PitchGraphic variant="hero" label="Build-up structure with a pass into the half-space" />
        )}
      </div>

      <div className="hero-visual__chip hero-visual__chip--score" aria-hidden="true">
        <span className="hero-visual__chip-label">Decision quality</span>
        <span className="hero-visual__chip-value">
          88<small>/100</small>
        </span>
      </div>
      <div className="hero-visual__chip hero-visual__chip--profile" aria-hidden="true">
        <span className="hero-visual__dot" />
        <span>
          Profile · <strong>Game reader</strong>
        </span>
      </div>
    </div>
  );
}
