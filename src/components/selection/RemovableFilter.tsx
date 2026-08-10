import { Action } from "@/components/controls/Action";

/**
 * Removable filter — represents one currently-applied filter criterion
 * plus its removal affordance. The remove control is a real M2.5 Action
 * (native <button>, tertiary/icon-only) — legitimate reuse of action
 * semantics for a genuine state-changing operation — but only that small
 * control, not the surrounding token, so the chip as a whole does not read
 * as a CTA. Owns representation only: reset/persistence architecture for a
 * real filter system belongs to M3.11 — Filters.
 */
interface RemovableFilterProps {
  label: string;
  onRemove: () => void;
  disabled?: boolean;
}

export function RemovableFilter({ label, onRemove, disabled }: RemovableFilterProps) {
  return (
    <span className="removable-filter">
      <span className="removable-filter-label type-label">{label}</span>
      <Action
        level="tertiary"
        iconOnly
        aria-label={`Remove ${label}`}
        onClick={onRemove}
        disabled={disabled}
      >
        <span aria-hidden="true">×</span>
      </Action>
    </span>
  );
}
