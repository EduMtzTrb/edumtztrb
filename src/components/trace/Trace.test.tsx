import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { RecordTrace, Trace } from "./Trace";
import { createRecordRegistry } from "@/domain/records/registry";
import {
  allFixtureRecords,
  fixtureAboutRecord,
  fixtureLabRecord,
  fixtureResearchRecord,
} from "@/domain/records/fixtures";
import { resolveCanonicalRoute } from "@/domain/records/RouteResolver";

describe("Trace (M4.10 §C9/§C20) — data-driven, never decorative", () => {
  const registry = createRecordRegistry(allFixtureRecords);

  it("renders the real source, the real derived label, and a real canonical destination link", () => {
    const relationship = fixtureResearchRecord.relationships![0]!;
    render(
      <Trace source={fixtureResearchRecord} relationship={relationship} registry={registry} />,
    );

    expect(screen.getByText(fixtureResearchRecord.title)).toBeInTheDocument();
    expect(screen.getByText("Tested in")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: fixtureLabRecord.title });
    expect(link).toHaveAttribute("href", resolveCanonicalRoute(fixtureLabRecord));
  });

  it("exposes the relationship type as data-relationship-type — the real stored type, not an invented category", () => {
    const relationship = fixtureResearchRecord.relationships![0]!;
    render(
      <Trace source={fixtureResearchRecord} relationship={relationship} registry={registry} />,
    );
    const container = screen.getByText(fixtureResearchRecord.title).closest(".trace");
    expect(container).toHaveAttribute("data-relationship-type", "tested-in");
  });

  it("renders nothing when the relationship's target cannot be resolved in the given registry", () => {
    const emptyRegistry = createRecordRegistry([fixtureResearchRecord]);
    const relationship = fixtureResearchRecord.relationships![0]!;
    const { container } = render(
      <Trace source={fixtureResearchRecord} relationship={relationship} registry={emptyRegistry} />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe("RecordTrace (M4.10 §C20) — no relationship, no Trace", () => {
  const registry = createRecordRegistry(allFixtureRecords);

  it("renders one Trace per real outgoing relationship", () => {
    render(<RecordTrace source={fixtureLabRecord} registry={registry} />);
    expect(screen.getByText("Developed into")).toBeInTheDocument();
    expect(screen.getByText("Commercialized as")).toBeInTheDocument();
  });

  it("renders nothing at all for a record with no relationships — the negative proof, not merely asserted", () => {
    expect(fixtureAboutRecord.relationships).toBeUndefined();
    const { container } = render(<RecordTrace source={fixtureAboutRecord} registry={registry} />);
    expect(container).toBeEmptyDOMElement();
  });
});
