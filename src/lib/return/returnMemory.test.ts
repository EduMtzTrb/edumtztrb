import { afterEach, describe, expect, it, vi } from "vitest";

import {
  captureReturnContext,
  clearReturnContext,
  findElementByReturnKey,
  restoreFocusByKey,
  restoreScroll,
  retrieveReturnContext,
} from "./returnMemory";

afterEach(() => {
  window.sessionStorage.clear();
  document.body.innerHTML = "";
});

describe("captureReturnContext / retrieveReturnContext (M4.6 §C12)", () => {
  it("direct entry produces no fake Return memory — nothing captured yet resolves to null", () => {
    expect(retrieveReturnContext("fixture-key")).toBeNull();
  });

  it("captures and restores the previous route, including its full query string", () => {
    captureReturnContext("fixture-key", {
      originUrl: "/index?district=work&sort=recent",
    });
    const restored = retrieveReturnContext("fixture-key");
    expect(restored?.originUrl).toBe("/index?district=work&sort=recent");
  });

  it("captures and restores the parent district", () => {
    captureReturnContext("fixture-key", { originUrl: "/work/example", parentDistrict: "work" });
    expect(retrieveReturnContext("fixture-key")?.parentDistrict).toBe("work");
  });

  it("captures and restores the selected record ID — an identifier only, never a full record", () => {
    captureReturnContext("fixture-key", {
      originUrl: "/work/example",
      selectedRecordId: "record-42",
    });
    const restored = retrieveReturnContext("fixture-key");
    expect(restored?.selectedRecordId).toBe("record-42");
    expect(restored).not.toHaveProperty("record");
  });

  it("captures and restores scroll position", () => {
    captureReturnContext("fixture-key", { originUrl: "/index", scrollY: 842 });
    expect(retrieveReturnContext("fixture-key")?.scrollY).toBe(842);
  });

  it("captures and restores a stable result-identity key, preferred over a raw index", () => {
    captureReturnContext("fixture-key", { originUrl: "/index", resultKey: "result-item-7" });
    expect(retrieveReturnContext("fixture-key")?.resultKey).toBe("result-item-7");
  });

  it("captures and restores a stable origin-control key", () => {
    captureReturnContext("fixture-key", { originUrl: "/index", originControlKey: "origin-1" });
    expect(retrieveReturnContext("fixture-key")?.originControlKey).toBe("origin-1");
  });

  it("captures and restores fixture-only comparison state", () => {
    captureReturnContext("fixture-key", {
      originUrl: "/products",
      comparisonState: { left: "product-a", right: "product-b" },
    });
    expect(retrieveReturnContext("fixture-key")?.comparisonState).toEqual({
      left: "product-a",
      right: "product-b",
    });
  });

  it("captures and restores fixture-only gallery position", () => {
    captureReturnContext("fixture-key", { originUrl: "/art/example", galleryPosition: 3 });
    expect(retrieveReturnContext("fixture-key")?.galleryPosition).toBe(3);
  });

  it("captures and restores fixture-only expanded/collapsed IDs", () => {
    captureReturnContext("fixture-key", {
      originUrl: "/about/profile",
      expandedIds: ["section-a", "section-c"],
    });
    expect(retrieveReturnContext("fixture-key")?.expandedIds).toEqual(["section-a", "section-c"]);
  });

  it("filter/lens state is carried entirely by originUrl — no separate field exists to duplicate it", () => {
    captureReturnContext("fixture-key", {
      originUrl: "/index?district=lab&type=prototype",
    });
    const restored = retrieveReturnContext("fixture-key");
    expect(restored).not.toHaveProperty("filters");
    expect(restored).not.toHaveProperty("criteria");
    expect(restored?.originUrl).toContain("district=lab");
    expect(restored?.originUrl).toContain("type=prototype");
  });

  it("clearReturnContext removes a capture — a subsequent retrieve is null again", () => {
    captureReturnContext("fixture-key", { originUrl: "/index" });
    expect(retrieveReturnContext("fixture-key")).not.toBeNull();
    clearReturnContext("fixture-key");
    expect(retrieveReturnContext("fixture-key")).toBeNull();
  });

  it("is genuinely session-scoped — backed by sessionStorage, not localStorage", () => {
    const localStorageSpy = vi.spyOn(window.localStorage, "setItem");
    captureReturnContext("fixture-key", { originUrl: "/index" });
    expect(localStorageSpy).not.toHaveBeenCalled();
    expect(window.sessionStorage.getItem("m4-return-memory:fixture-key")).not.toBeNull();
    localStorageSpy.mockRestore();
  });

  it("stores only JSON-safe data — round-tripping through JSON changes nothing", () => {
    captureReturnContext("fixture-key", {
      originUrl: "/index",
      parentDistrict: "research",
      scrollY: 100,
      expandedIds: ["a"],
    });
    const restored = retrieveReturnContext("fixture-key")!;
    expect(JSON.parse(JSON.stringify(restored))).toEqual(restored);
  });

  it("a corrupted stored value degrades to null rather than throwing", () => {
    window.sessionStorage.setItem("m4-return-memory:fixture-key", "not valid json{{{");
    expect(retrieveReturnContext("fixture-key")).toBeNull();
  });
});

describe("findElementByReturnKey / restoreFocusByKey (M4.6 §C5/§C12)", () => {
  it("resolves a live element by its stable data-return-origin-key", () => {
    document.body.innerHTML = `<button data-return-origin-key="origin-1">Trigger</button>`;
    const found = findElementByReturnKey("origin-1");
    expect(found).not.toBeNull();
    expect(found?.tagName).toBe("BUTTON");
  });

  it("missing origin is handled safely — resolves to null, never throws", () => {
    expect(findElementByReturnKey("does-not-exist")).toBeNull();
  });

  it("restoreFocusByKey moves focus to the resolved element and returns true", () => {
    document.body.innerHTML = `<button data-return-origin-key="origin-1">Trigger</button>`;
    expect(restoreFocusByKey("origin-1")).toBe(true);
    expect(document.activeElement?.getAttribute("data-return-origin-key")).toBe("origin-1");
  });

  it("restoreFocusByKey returns false without throwing when the target no longer exists (changed layout / stale target)", () => {
    expect(() => restoreFocusByKey("removed-item")).not.toThrow();
    expect(restoreFocusByKey("removed-item")).toBe(false);
  });

  it("restoreFocusByKey returns false for an undefined key", () => {
    expect(restoreFocusByKey(undefined)).toBe(false);
  });
});

describe("restoreScroll (M4.6 §C7)", () => {
  it("calls window.scrollTo with an instant (non-smooth) restoration", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    restoreScroll(500);
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 500, behavior: "auto" });
    scrollToSpy.mockRestore();
  });

  it("does nothing when scrollY is undefined", () => {
    const scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    restoreScroll(undefined);
    expect(scrollToSpy).not.toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });
});
