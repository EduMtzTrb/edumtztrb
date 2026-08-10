import { afterEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { PassageIndexRecord } from "./PassageIndexRecord";
import { retrieveReturnContext } from "@/lib/return/returnMemory";
import { WORK_RECORD_PASSAGE_RETURN_KEY } from "@/lib/return/recordPassageKeys";

afterEach(() => {
  window.sessionStorage.clear();
});

describe("PassageIndexRecord (M4.8)", () => {
  it("renders the same visual structure as a plain Index row (same classes, same link name)", () => {
    render(
      <PassageIndexRecord
        title="Fixture work outcome"
        href="/work/fixture-work-outcome"
        type="project"
        recordId="record-1"
        slug="fixture-work-outcome"
        ownerDistrict="work"
      />,
    );
    const link = screen.getByRole("link", { name: /Fixture work outcome/i });
    expect(link).toHaveClass("record-index-link");
    expect(link).toHaveAttribute("href", "/work/fixture-work-outcome");
  });

  it("clicking the row captures Return context before navigation, using the fixed passage key", () => {
    render(
      <PassageIndexRecord
        title="Fixture work outcome"
        href="/work/fixture-work-outcome"
        recordId="record-1"
        slug="fixture-work-outcome"
        ownerDistrict="work"
      />,
    );
    expect(retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY)).toBeNull();

    fireEvent.click(screen.getByRole("link", { name: /Fixture work outcome/i }));

    const captured = retrieveReturnContext(WORK_RECORD_PASSAGE_RETURN_KEY);
    expect(captured).not.toBeNull();
    expect(captured?.selectedRecordId).toBe("record-1");
    expect(captured?.resultKey).toBe("fixture-work-outcome");
    expect(captured?.parentDistrict).toBe("work");
  });
});
