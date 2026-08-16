import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { readdirSync } from "node:fs";
import { join } from "node:path";

import ContactPage from "@/app/contact/page";

/**
 * M6.1 — Contact route composition. Protects that the real Contact form
 * (not a fixture) renders on direct entry, unconditionally, and coexists
 * correctly with the pre-existing M4/M5 dev-fixture gates on the same
 * route. See docs/implementation/M6.1_CONTACT.md.
 */
describe("Contact route composition (M6.1)", () => {
  it("/contact with no flag renders the real Contact form on direct, cold entry", async () => {
    const element = await ContactPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("heading", { level: 1, name: "Contact" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^Name/ })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^Reply email/ })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /^Message/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("the real Contact form still renders alongside a dev-fixture flag — the two coexist, neither replaces the other", async () => {
    const element = await ContactPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ "motion-fixture": "m4a" }),
    });
    render(element);
    expect(screen.getByRole("textbox", { name: /^Name/ })).toBeInTheDocument();
    expect(
      screen.getByText("M4-A Motion Foundation Fixture — not real public content"),
    ).toBeInTheDocument();
  });

  it("creates no Contact-specific stylesheet — reuses M2.10 form.css unmodified", () => {
    const stylesDir = join(process.cwd(), "src", "styles");
    const files = readdirSync(stylesDir);
    expect(files).not.toContain("contact.css");
  });
});
