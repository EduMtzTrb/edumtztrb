import { describe, expect, it } from "vitest";

import {
  deriveCommitmentAvailability,
  TRANSACTION_ACTIVATION_CONFIGURED,
} from "./transactionBoundary";

/**
 * M6.5 — Products transaction boundary contract. Protects the specific
 * guarantee this module exists for: commitment truth is derived from real
 * Product-record state, never fabricated, and the module itself carries no
 * provider-specific logic. See
 * docs/implementation/M6.5_PRODUCTS_TRANSACTION_BOUNDARY.md.
 */
describe("deriveCommitmentAvailability (M6.5)", () => {
  it("blocks commitment for every non-committable ProductCommercialState", () => {
    const blocked = [
      "forthcoming",
      "temporarily-unavailable",
      "capacity-closed",
      "sold-out",
      "discontinued",
      "superseded",
      "archived",
      "regionally-unavailable",
    ] as const;
    for (const commercialState of blocked) {
      const result = deriveCommitmentAvailability({
        commercialState,
        commitmentLabel: "Purchase",
      });
      expect(result.stateAllowsCommitment).toBe(false);
      expect(result.label).toBeUndefined();
      expect(result.reason).toContain(commercialState);
    }
  });

  it("archived cannot purchase — an explicit named case from this task's own scope", () => {
    const result = deriveCommitmentAvailability({
      commercialState: "archived",
      commitmentLabel: "Purchase",
    });
    expect(result.stateAllowsCommitment).toBe(false);
  });

  it("unavailable cannot purchase — an explicit named case from this task's own scope", () => {
    const result = deriveCommitmentAvailability({
      commercialState: "temporarily-unavailable",
      commitmentLabel: "Purchase",
    });
    expect(result.stateAllowsCommitment).toBe(false);
  });

  it("an undeclared commercial state honestly does not allow commitment, with no field guessed", () => {
    const result = deriveCommitmentAvailability({
      commercialState: undefined,
      commitmentLabel: "Purchase",
    });
    expect(result.stateAllowsCommitment).toBe(false);
    expect(result.label).toBeUndefined();
    expect(result.reason).toMatch(/not been declared/);
  });

  it("a genuinely offerable state (available) is state-permitted, but real commitment execution stays gated by the real M6.6 configuration fact", () => {
    const result = deriveCommitmentAvailability({
      commercialState: "available",
      commitmentLabel: "Purchase",
    });
    expect(result.stateAllowsCommitment).toBe(true);
    expect(result.label).toBe("Purchase");
    expect(result.reason).toMatch(/not yet activated/);
    // This assertion documents the real repository fact this function reads —
    // if it ever flips true, real configuration must exist, not just a flag flip.
    expect(TRANSACTION_ACTIVATION_CONFIGURED).toBe(false);
  });

  it("quotation-required-style offers still resolve through the same real commitmentLabel — no fabricated 'enquire' kind invented", () => {
    const result = deriveCommitmentAvailability({
      commercialState: "available",
      commitmentLabel: "Request a quote",
    });
    expect(result.label).toBe("Request a quote");
  });

  it("limited/made-to-order/preorder/free-access are all genuinely offerable states, per PRODUCTS_UNIVERSE_v1.1.md §13", () => {
    const offerable = ["limited", "made-to-order", "preorder", "free-access"] as const;
    for (const commercialState of offerable) {
      const result = deriveCommitmentAvailability({ commercialState, commitmentLabel: "Reserve" });
      expect(result.stateAllowsCommitment).toBe(true);
    }
  });

  it("carries no provider-specific field anywhere in its own return shape", () => {
    const result = deriveCommitmentAvailability({
      commercialState: "available",
      commitmentLabel: "Purchase",
    });
    const keys = Object.keys(result);
    expect(keys).toEqual(["stateAllowsCommitment", "label", "reason"]);
    expect(JSON.stringify(result).toLowerCase()).not.toMatch(/stripe|paypal|checkout|provider|sdk/);
  });
});
