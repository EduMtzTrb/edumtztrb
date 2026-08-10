"use client";

import { useId } from "react";
import type { ReactNode } from "react";

/**
 * Segmented view — a mutually-exclusive view-mode selector within one
 * context (not route navigation, not tabs/panels, not a filter). Built on
 * a native radio group so browser keyboard behavior (arrow-key roving,
 * space/click activation) comes for free rather than being reimplemented.
 */

export interface SegmentedOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

interface SegmentedViewProps {
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SegmentedOption[];
}

export function SegmentedView({ label, name, value, onChange, options }: SegmentedViewProps) {
  const groupId = useId();
  const groupName = name ?? groupId;

  return (
    <fieldset className="segmented-view" role="radiogroup">
      <legend className="segmented-view-legend type-caption">{label}</legend>
      <div className="segmented-view-options">
        {options.map((option) => {
          const inputId = `${groupId}-${option.value}`;
          return (
            <span className="segmented-option" key={option.value}>
              <input
                type="radio"
                id={inputId}
                name={groupName}
                value={option.value}
                checked={option.value === value}
                disabled={option.disabled}
                onChange={() => onChange(option.value)}
                className="visually-hidden-input segmented-option-input"
              />
              <label htmlFor={inputId} className="segmented-option-label type-label">
                {option.label}
              </label>
            </span>
          );
        })}
      </div>
    </fieldset>
  );
}
