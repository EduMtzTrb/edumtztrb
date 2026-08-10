import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import ContactPage from "@/app/contact/page";

/** Real /contact route wiring for the M4-A motion fixture gate — M4.3 §C21. */
describe("Motion fixture route wiring (M4.3)", () => {
  it("/contact with no flag renders normally, without the fixture", async () => {
    const element = await ContactPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({}),
    });
    render(element);
    expect(screen.getByRole("heading", { level: 1, name: "Contact" })).toBeInTheDocument();
    expect(screen.queryByText(/M4-A Motion Foundation Fixture/i)).not.toBeInTheDocument();
  });

  it("/contact?motion-fixture=m4a renders the labeled fixture", async () => {
    const element = await ContactPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ "motion-fixture": "m4a" }),
    });
    render(element);
    expect(
      screen.getByText("M4-A Motion Foundation Fixture — not real public content"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /hover, tab to, or click me/i })).toBeInTheDocument();
  });

  it("an unrecognized flag value does not activate the fixture", async () => {
    const element = await ContactPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ "motion-fixture": "wrong" }),
    });
    render(element);
    expect(screen.queryByText(/M4-A Motion Foundation Fixture/i)).not.toBeInTheDocument();
  });

  it("/contact?motion-fixture=m4b renders the labeled M4-B Focus fixture instead of the M4-A one", async () => {
    const element = await ContactPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ "motion-fixture": "m4b" }),
    });
    render(element);
    expect(
      screen.getByText("M4-B Focus / Return Fixture — not real public content"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/M4-A Motion Foundation Fixture/i)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /focus: evidence a/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open overlay" })).toBeInTheDocument();
  });
});
