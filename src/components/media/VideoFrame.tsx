import type { ReactNode } from "react";

import { Figure } from "./Figure";

/**
 * Video Frame — native `<video>` semantics (§17 of this task's own scope;
 * DESIGN_SYSTEM.md v1.1 §43). `controls` is always present; default
 * playback is user-initiated (`autoPlay` defaults to false). §43 permits
 * autoplay only when audio is absent/muted — enforced at the type level
 * here, not just by convention: passing `autoPlay: true` requires
 * `muted: true` in the same prop object, so a silently-autoplaying video
 * can never carry unexpected audio. No custom transport controls are
 * built — native `<video controls>` already provides accessible,
 * keyboard-operable playback controls M2.5 would only duplicate.
 */
type VideoFramePlaybackProps =
  | { autoPlay?: false; muted?: boolean; loop?: boolean }
  | { autoPlay: true; muted: true; loop?: boolean };

interface VideoFrameOwnProps {
  src: string;
  label: string;
  poster?: string;
  caption?: ReactNode;
  credit?: ReactNode;
  /** Accessibility hook (§20, §63): a real captions track, only rendered when supplied. */
  captionsSrc?: string;
  captionsLabel?: string;
}

type VideoFrameProps = VideoFrameOwnProps & VideoFramePlaybackProps;

export function VideoFrame({
  src,
  label,
  poster,
  caption,
  credit,
  captionsSrc,
  captionsLabel,
  autoPlay,
  muted,
  loop,
}: VideoFrameProps) {
  return (
    <Figure
      ariaLabel={label}
      caption={caption}
      credit={credit}
      media={
        <video
          className="media-video"
          src={src}
          poster={poster}
          controls
          autoPlay={autoPlay ?? false}
          muted={muted ?? false}
          loop={loop ?? false}
        >
          {captionsSrc !== undefined && (
            <track
              kind="captions"
              src={captionsSrc}
              srcLang="en"
              label={captionsLabel ?? "Captions"}
              default
            />
          )}
        </video>
      }
    />
  );
}
