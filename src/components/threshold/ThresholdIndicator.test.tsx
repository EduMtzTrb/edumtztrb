import { afterEach, describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import { ThresholdIndicator } from "./ThresholdIndicator";
import { markThresholdDeparture, hasTraversedThreshold } from "@/lib/threshold/familiarity";
import { HOME_TO_WORK_ARRIVAL_KEY, HOME_WORK_THRESHOLD_KEY } from "@/lib/threshold/thresholdKeys";

afterEach(() => {
  window.sessionStorage.clear();
});

describe("ThresholdIndicator (M4.9)", () => {
  it("direct/cold entry — no departure was ever marked — renders nothing", () => {
    render(
      <ThresholdIndicator
        arrivalKey={HOME_TO_WORK_ARRIVAL_KEY}
        label="Arriving from Home — richer"
        repeatedLabel="Arriving from Home"
      />,
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("first entry shows the richer label and data-threshold-state=first-entry", async () => {
    markThresholdDeparture(HOME_TO_WORK_ARRIVAL_KEY);
    render(
      <ThresholdIndicator
        arrivalKey={HOME_TO_WORK_ARRIVAL_KEY}
        label="Arriving from Home — richer"
        repeatedLabel="Arriving from Home"
      />,
    );
    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("Arriving from Home — richer");
    expect(status).toHaveAttribute("data-threshold-state", "first-entry");
  });

  it("marks the threshold traversed after a first entry, so a later visit is classified as repeated", async () => {
    markThresholdDeparture(HOME_TO_WORK_ARRIVAL_KEY);
    render(
      <ThresholdIndicator
        arrivalKey={HOME_TO_WORK_ARRIVAL_KEY}
        label="first"
        repeatedLabel="repeat"
      />,
    );
    await waitFor(() => expect(hasTraversedThreshold(HOME_WORK_THRESHOLD_KEY)).toBe(true));
  });

  it("repeated entry (threshold already traversed) shows the shorter label — reduced assembly", async () => {
    markThresholdDeparture(HOME_TO_WORK_ARRIVAL_KEY);
    const { unmount } = render(
      <ThresholdIndicator
        arrivalKey={HOME_TO_WORK_ARRIVAL_KEY}
        label="Arriving from Home — richer"
        repeatedLabel="Arriving from Home"
      />,
    );
    await waitFor(() => expect(hasTraversedThreshold(HOME_WORK_THRESHOLD_KEY)).toBe(true));
    unmount();

    markThresholdDeparture(HOME_TO_WORK_ARRIVAL_KEY);
    render(
      <ThresholdIndicator
        arrivalKey={HOME_TO_WORK_ARRIVAL_KEY}
        label="Arriving from Home — richer"
        repeatedLabel="Arriving from Home"
      />,
    );
    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent("Arriving from Home");
    expect(status).not.toHaveTextContent("richer");
    expect(status).toHaveAttribute("data-threshold-state", "repeated-entry");
  });

  it("consumes the arrival flag — a page reload without a fresh departure shows nothing", async () => {
    markThresholdDeparture(HOME_TO_WORK_ARRIVAL_KEY);
    const { unmount } = render(
      <ThresholdIndicator arrivalKey={HOME_TO_WORK_ARRIVAL_KEY} label="a" repeatedLabel="b" />,
    );
    await screen.findByRole("status");
    unmount();

    render(
      <ThresholdIndicator arrivalKey={HOME_TO_WORK_ARRIVAL_KEY} label="a" repeatedLabel="b" />,
    );
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
