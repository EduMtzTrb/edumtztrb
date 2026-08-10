import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { VideoFrame } from "./VideoFrame";

describe("VideoFrame", () => {
  it("renders a native video element with controls, inside a labeled figure", () => {
    const { container } = render(<VideoFrame src="/fixture.mp4" label="Fixture video context" />);
    const video = container.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute("src", "/fixture.mp4");
    expect(screen.getByRole("figure", { name: "Fixture video context" })).toBeInTheDocument();
  });

  it("does not autoplay by default", () => {
    const { container } = render(<VideoFrame src="/fixture.mp4" label="Fixture video context" />);
    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video.autoplay).toBe(false);
  });

  it("supports an optional poster", () => {
    const { container } = render(
      <VideoFrame src="/fixture.mp4" label="Fixture video context" poster="/fixture-poster.jpg" />,
    );
    expect(container.querySelector("video")).toHaveAttribute("poster", "/fixture-poster.jpg");
  });

  it("requires muted when autoPlay is true (enforced at the type level, exercised here at runtime)", () => {
    const { container } = render(
      <VideoFrame src="/fixture.mp4" label="Fixture video context" autoPlay muted />,
    );
    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video.autoplay).toBe(true);
    expect(video.muted).toBe(true);
  });

  it("renders a captions track only when a captions source is supplied", () => {
    const { container: withoutTrack } = render(
      <VideoFrame src="/fixture.mp4" label="Fixture video context" />,
    );
    expect(withoutTrack.querySelector("track")).not.toBeInTheDocument();

    const { container: withTrack } = render(
      <VideoFrame
        src="/fixture.mp4"
        label="Fixture video context"
        captionsSrc="/fixture-captions.vtt"
        captionsLabel="English"
      />,
    );
    const track = withTrack.querySelector("track");
    expect(track).toHaveAttribute("kind", "captions");
    expect(track).toHaveAttribute("src", "/fixture-captions.vtt");
    expect(track).toHaveAttribute("label", "English");
  });
});
