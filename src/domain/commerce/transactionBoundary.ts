/**
 * Products transaction boundary — M6.5.
 *
 * Authority: `IMPLEMENTATION_PLAN.md` §18 ("Products Transaction
 * Boundary" — Product record owns offer identity/family/form/price
 * state/availability/fulfilment/access/licensing/support/lifecycle/
 * transaction-or-enquiry pathway; the transaction adapter "may initiate
 * permitted action, pass approved Product identifiers/variants, receive
 * success/failure/cancellation, and normalize transaction state";
 * "Provider choice is technical/operational and may not alter Product
 * identity, page architecture, origin ownership, availability truth,
 * commitment labels, or legal obligations"; "If commerce is not ready,
 * only truthful states/actions such as unavailable, forthcoming, quote
 * request, commissioning information, enquiry, or archive are shown. No
 * fake checkout."), §11 M6.5/M6.6 (transaction boundary vs. activation
 * are two separate work packages — this module is the boundary only).
 *
 * WHAT THIS MODULE IS — a pure, dependency-free function deriving real
 * commitment truth from a Product record's own already-approved fields
 * (`ProductsExtension.commercialState`, `commitmentLabel`, both M3.2,
 * unmodified) plus one real, repository-verifiable fact: no commercial
 * or legal configuration has been approved anywhere in this repository
 * yet (see `docs/implementation/M6.5_PRODUCTS_TRANSACTION_BOUNDARY.md`
 * "M6.6 Gate" for the audit). It invents no new commitment-kind
 * taxonomy — `commitmentLabel` remains the same free-text field M3.2
 * already approved (`PLATFORM_SPECIFICATION.md` §33.1: "commitment
 * labels are literal"); this module only decides *whether* that label
 * may currently be acted on, never what the label says.
 *
 * WHAT THIS MODULE IS NOT — no payment-provider ID, no checkout-session
 * logic, no provider URL, no payment SDK import exists anywhere in this
 * file or in any consumer. `CommitmentAvailability` carries only real
 * Product-record facts and a plain-text reason; a provider integration
 * (Milestone 6.6, once activated) would sit entirely behind this
 * boundary, never inside a canonical Product record.
 */

import type {
  ProductCommercialState,
  ProductsExtension,
} from "@/domain/records/DistrictExtensions";

/**
 * The seven `ProductCommercialState` values (M3.2, unmodified) under
 * which a real commitment action can never be truthful, regardless of
 * whether transaction infrastructure exists — a state fact, not a
 * configuration fact. `"limited"`/`"made-to-order"`/`"preorder"`/
 * `"free-access"`/`"available"` are the states PRODUCTS_UNIVERSE_v1.1.md
 * §13 itself frames as genuinely offerable conditions (with their own
 * stated terms); everything below is the inverse — explicitly not
 * offerable right now.
 */
const NON_COMMITTABLE_STATES: readonly ProductCommercialState[] = [
  "forthcoming",
  "temporarily-unavailable",
  "capacity-closed",
  "sold-out",
  "discontinued",
  "superseded",
  "archived",
  "regionally-unavailable",
];

export interface CommitmentAvailability {
  /** Whether the record's own real commercial state permits any commitment action at all — a state fact, never provider-dependent. */
  stateAllowsCommitment: boolean;
  /** The record's own real, disclosed commitment label — present only when the state allows it. Never rendered as a functional control until M6.6 activates (see the consuming page's own documentation). */
  label: string | undefined;
  /** Why a real commitment cannot execute right now — either the real state, or (when the state would otherwise allow it) the real, repository-verifiable absence of M6.6 configuration. Never a fabricated reason. */
  reason: string;
}

/**
 * The real, current M6.6 configuration state of this repository — no
 * seller identity, price currency policy, tax treatment, payment
 * provider, or legal terms have been approved anywhere in repository
 * authority (audited fresh for M6-A; see
 * `docs/implementation/M6.5_PRODUCTS_TRANSACTION_BOUNDARY.md` "M6.6
 * Gate"). This is a real fact about the repository's current state, not
 * a provider flag — flipping it requires the actual configuration to
 * exist, not a code change here.
 */
export const TRANSACTION_ACTIVATION_CONFIGURED = false;

export function deriveCommitmentAvailability(
  extension: Pick<ProductsExtension, "commercialState" | "commitmentLabel">,
): CommitmentAvailability {
  const state = extension.commercialState;
  const stateAllowsCommitment = state !== undefined && !NON_COMMITTABLE_STATES.includes(state);

  if (!stateAllowsCommitment) {
    return {
      stateAllowsCommitment: false,
      label: undefined,
      reason: state
        ? `This offer's real state ("${state}") does not permit commitment.`
        : "This offer's commercial state has not been declared.",
    };
  }

  if (!TRANSACTION_ACTIVATION_CONFIGURED) {
    return {
      stateAllowsCommitment: true,
      label: extension.commitmentLabel,
      reason:
        "Transaction execution is not yet activated — Milestone 6.6 requires verified commercial and legal configuration that does not yet exist in this repository.",
    };
  }

  return {
    stateAllowsCommitment: true,
    label: extension.commitmentLabel,
    reason: "Available.",
  };
}
