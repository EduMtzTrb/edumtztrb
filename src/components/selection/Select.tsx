import { useId } from "react";
import type { SelectHTMLAttributes } from "react";

/**
 * Select — a native <select>, not a custom combobox. Preserves native
 * keyboard/touch behavior, option semantics, and platform picker UI.
 * Owns only labeling, focus-visible, and disabled state; validation,
 * guidance, and required-state UI belong to M2.10 — Form family.
 */
export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  label: string;
  options: SelectOption[];
}

export function Select({ label, options, id, className, ...selectProps }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const classes = ["select", "type-body"];
  if (className) classes.push(className);

  return (
    <span className="select-field">
      <label htmlFor={selectId} className="select-label type-caption">
        {label}
      </label>
      <select id={selectId} className={classes.join(" ")} {...selectProps}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </span>
  );
}
