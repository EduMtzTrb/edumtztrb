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

  it("/contact?motion-fixture=m4c renders the labeled M4-C Comparison/Trace fixture, mutually exclusive with the others", async () => {
    const element = await ContactPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ "motion-fixture": "m4c" }),
    });
    render(element);
    expect(
      screen.getByText("M4-C Comparison / Trace Fixture — not real public content"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/M4-A Motion Foundation Fixture/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/M4-B Focus \/ Return Fixture/i)).not.toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Attempt A" })).toBeInTheDocument();
    expect(screen.getByText("Tested in")).toBeInTheDocument();
  });

  it("/contact?composition-fixture=m5 renders the labeled M5.0 District Composition fixture, independent of the motion-fixture flag", async () => {
    const element = await ContactPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ "composition-fixture": "m5" }),
    });
    const { container } = render(element);
    expect(
      screen.getByText("M5.0 District Composition Fixture — not real public content"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/M4-A Motion Foundation Fixture/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Dense \/ evidence-forward/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Editorial \/ reading-forward/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: /Sparse \/ focus-forward/ }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("complementary", { name: "Related" })).toHaveLength(3);
    // One shared composition system, not three layouts: all three sections
    // render the same `.district-field` primitive, distinguished only by
    // `data-density`, never by a per-district or per-state class fork.
    const fields = container.querySelectorAll(".district-field");
    expect(fields).toHaveLength(3);
    expect([...fields].map((field) => field.getAttribute("data-density")).sort()).toEqual([
      "concentrated",
      "dense",
      "moderate",
    ]);
  });

  it("an unrecognized composition-fixture value does not activate the M5.0 fixture", async () => {
    const element = await ContactPage({
      params: Promise.resolve({}),
      searchParams: Promise.resolve({ "composition-fixture": "wrong" }),
    });
    render(element);
    expect(screen.queryByText(/M5\.0 District Composition Fixture/i)).not.toBeInTheDocument();
  });
});
