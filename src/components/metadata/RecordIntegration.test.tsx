import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { CanonicalRecordShell } from "@/components/page-shells/CanonicalRecordShell";
import { Figure } from "@/components/media/Figure";

import { MetadataRail } from "./MetadataRail";

/**
 * Confirms the Metadata Rail coexists with representative record/media
 * structures without either package needing to change — component
 * integration testing only, per this task's own instruction. No
 * production page is modified to demonstrate this.
 */
describe("M2.9 / record & media integration", () => {
  it("fits inside CanonicalRecordShell's existing metadata region (M1.5) unmodified", () => {
    render(
      <CanonicalRecordShell
        heading="Fixture record"
        metadata={
          <MetadataRail
            label="Fixture record metadata"
            items={[
              { label: "Year", value: "2024" },
              { label: "Role", value: "Fixture role" },
            ]}
          />
        }
      />,
    );
    expect(screen.getByRole("heading", { name: "Fixture record" })).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("stays record-level and distinct from M2.8's media-intrinsic caption/credit", () => {
    render(
      <div>
        <Figure
          media={<img src="/fixture.jpg" alt="Fixture drawing" />}
          caption="Fixture figure caption"
          credit="Fixture photographer"
        />
        <MetadataRail
          label="Fixture record metadata"
          items={[{ label: "Medium", value: "Fixture medium" }]}
        />
      </div>,
    );
    // The figure's own caption/credit remain inside its own figcaption —
    // never absorbed into the rail's dl/dt/dd structure.
    expect(screen.getByText(/Fixture figure caption/)).toBeInTheDocument();
    expect(screen.getByText(/Fixture photographer/)).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("Fixture medium")).toBeInTheDocument();
  });
});
