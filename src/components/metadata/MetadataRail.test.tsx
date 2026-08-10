import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { MetadataRail } from "./MetadataRail";

describe("MetadataRail", () => {
  it("renders a real, labeled description list", () => {
    const { container } = render(
      <MetadataRail label="Fixture metadata" items={[{ label: "Year", value: "2024" }]} />,
    );
    const dl = container.querySelector("dl");
    expect(dl).toBeInTheDocument();
    expect(dl).toHaveAttribute("aria-label", "Fixture metadata");
  });

  it("associates each label with its value via dt/dd", () => {
    const { container } = render(
      <MetadataRail
        label="Fixture metadata"
        items={[
          { label: "Year", value: "2024" },
          { label: "Role", value: "Fixture role" },
        ]}
      />,
    );
    const terms = container.querySelectorAll("dt");
    const definitions = container.querySelectorAll("dd");
    expect(terms).toHaveLength(2);
    expect(definitions).toHaveLength(2);
    expect(terms[0]).toHaveTextContent("Year");
    expect(definitions[0]).toHaveTextContent("2024");
    expect(terms[1]).toHaveTextContent("Role");
    expect(definitions[1]).toHaveTextContent("Fixture role");
  });

  it("preserves supplied order — never reorders or alphabetizes", () => {
    const { container } = render(
      <MetadataRail
        label="Fixture metadata"
        items={[
          { label: "Zebra field", value: "z" },
          { label: "Alpha field", value: "a" },
        ]}
      />,
    );
    const terms = Array.from(container.querySelectorAll("dt")).map((el) => el.textContent);
    expect(terms).toEqual(["Zebra field", "Alpha field"]);
  });

  it("omits clarification cleanly when not supplied", () => {
    const { container } = render(
      <MetadataRail label="Fixture metadata" items={[{ label: "Year", value: "2024" }]} />,
    );
    expect(container.querySelector(".metadata-clarification")).not.toBeInTheDocument();
  });

  it("renders an accessible clarification visibly when supplied", () => {
    render(
      <MetadataRail
        label="Fixture metadata"
        items={[{ label: "Duration", value: "12", clarification: "minutes" }]}
      />,
    );
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText(/minutes/)).toBeVisible();
  });

  it("supports a ReactNode/link value", () => {
    render(
      <MetadataRail
        label="Fixture metadata"
        items={[
          {
            label: "Source",
            value: <a href="/fixture-source">Fixture source</a>,
          },
        ]}
      />,
    );
    const link = screen.getByRole("link", { name: "Fixture source" });
    expect(link).toHaveAttribute("href", "/fixture-source");
  });

  it("groups consecutive same-group entries into one named group", () => {
    render(
      <MetadataRail
        label="Fixture metadata"
        items={[
          { label: "Ungrouped", value: "x" },
          { label: "Collaborator", value: "Fixture A", group: "Collaborators" },
          { label: "Collaborator", value: "Fixture B", group: "Collaborators" },
        ]}
      />,
    );
    const group = screen.getByRole("group", { name: "Collaborators" });
    expect(within(group).getAllByText(/Fixture [AB]/)).toHaveLength(2);
  });

  it("exposes tier via data-tier, defaulting to secondary", () => {
    const { container } = render(
      <MetadataRail
        label="Fixture metadata"
        items={[
          { label: "Default", value: "x" },
          { label: "Primary", value: "y", tier: "primary" },
          { label: "Latent", value: "z", tier: "latent" },
        ]}
      />,
    );
    const items = container.querySelectorAll(".metadata-item");
    expect(items[0]).toHaveAttribute("data-tier", "secondary");
    expect(items[1]).toHaveAttribute("data-tier", "primary");
    expect(items[2]).toHaveAttribute("data-tier", "latent");
  });

  it("introduces no interactivity of its own — no button/link unless a value itself supplies one", () => {
    render(
      <MetadataRail
        label="Fixture metadata"
        items={[
          { label: "Year", value: "2024" },
          { label: "Role", value: "Fixture role" },
        ]}
      />,
    );
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("does not generate a placeholder value for missing entries — only supplied items render", () => {
    render(<MetadataRail label="Fixture metadata" items={[{ label: "Year", value: "2024" }]} />);
    expect(screen.queryByText("N/A")).not.toBeInTheDocument();
    expect(screen.queryByText("—")).not.toBeInTheDocument();
  });
});
