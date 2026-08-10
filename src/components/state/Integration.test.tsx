import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Action } from "@/components/controls/Action";
import { FormConfirmation } from "@/components/form/FormConfirmation";
import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { StatusTag } from "@/components/selection/StatusTag";

import { ArchivedState } from "./ArchivedState";
import { ErrorState } from "./ErrorState";
import { RestrictedState } from "./RestrictedState";
import { SuccessState } from "./SuccessState";

/**
 * Confirms M2.11's states compose correctly with prior-milestone
 * primitives without duplicating or invalidating any of them — component
 * integration testing only, per this task's own instruction. No
 * production route is modified.
 */
describe("M2.11 boundary integration", () => {
  it("reuses a real M2.5 Action as a state's recovery action, not a state-specific button", () => {
    render(
      <ErrorState
        heading="Fixture: something went wrong"
        action={<Action level="secondary">Fixture retry</Action>}
      />,
    );
    const retry = screen.getByRole("button", { name: "Fixture retry" });
    expect(retry).toHaveClass("action-secondary");
  });

  it("FormConfirmation (M2.10) and SuccessState (M2.11) coexist as two distinct, uninvalidated components", () => {
    render(
      <div>
        <FormConfirmation>Fixture: your changes were saved.</FormConfirmation>
        <SuccessState heading="Fixture: submission received" />
      </div>,
    );
    expect(screen.getAllByRole("status")).toHaveLength(2);
    expect(screen.getByText("Fixture: your changes were saved.")).toBeInTheDocument();
    expect(screen.getByText("Fixture: submission received")).toBeInTheDocument();
  });

  it("ArchivedState fits inside CanonicalRecordShell's existing publicState region, unmodified", () => {
    render(
      <CanonicalRecordShell
        heading="Fixture record"
        publicState={<ArchivedState heading="Fixture: archived" context="Fixture: superseded" />}
      />,
    );
    expect(screen.getByRole("heading", { name: "Fixture record" })).toBeInTheDocument();
    expect(screen.getByText("Fixture: archived")).toBeInTheDocument();
    expect(screen.getByText("Fixture: superseded")).toBeInTheDocument();
  });

  it("RestrictedState fits inside CanonicalRecordShell's existing publicState region, unmodified", () => {
    render(
      <CanonicalRecordShell
        heading="Fixture record"
        publicState={
          <RestrictedState
            heading="Fixture: not publicly available"
            explanation="Fixture: approved public wording"
          />
        }
      />,
    );
    expect(screen.getByText("Fixture: approved public wording")).toBeInTheDocument();
  });

  it("StatusTag (M2.6) and static states remain distinct — a compact informational label is not a substitute for a full state", () => {
    render(
      <div>
        <StatusTag>Fixture: Archived</StatusTag>
        <ArchivedState heading="Fixture: archived record" />
      </div>,
    );
    expect(screen.getByText("Fixture: Archived")).toHaveClass("status-tag");
    expect(screen.getByText("Fixture: archived record")).toHaveClass("static-state-heading");
  });
});
