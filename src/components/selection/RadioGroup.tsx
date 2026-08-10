import type { ReactNode } from "react";

/**
 * RadioGroup / Radio — a native, mutually-exclusive `<input type="radio">`
 * group inside a labeled `<fieldset>`. Each input is visually hidden
 * (`.visually-hidden-input`) with a decorative circular sibling marking
 * checked/unchecked; checked state is a border-color change *and* a
 * filled inner dot (shape, not color alone).
 */
export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
}

export function RadioGroup({ label, name, value, onChange, options }: RadioGroupProps) {
  return (
    <fieldset className="radio-group" role="radiogroup">
      <legend className="radio-group-legend type-caption">{label}</legend>
      {options.map((option) => (
        <label className="radio" key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === value}
            disabled={option.disabled}
            onChange={() => onChange(option.value)}
            className="visually-hidden-input"
          />
          <span className="radio-dot" aria-hidden="true" />
          <span className="radio-label-text type-body">{option.label}</span>
        </label>
      ))}
    </fieldset>
  );
}
