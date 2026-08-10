import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * TextField — a native `<input>` with the full form-field anatomy this
 * task's own scope requires: persistent visible label, optional guidance,
 * required state, focus, error + explanation, disabled state.
 *
 * Placeholder is never a label substitute: `placeholder` passes straight
 * through to the native `<input>` (via `inputProps`) as ordinary example/
 * hint text, but `label` is always rendered as a real, persistent
 * `<label>` — nothing here ever hides or replaces it.
 */
export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  guidance?: ReactNode;
  error?: ReactNode;
  id?: string;
}

export function TextField({
  label,
  guidance,
  error,
  required,
  id,
  className,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const guidanceId = guidance !== undefined ? `${fieldId}-guidance` : undefined;
  const errorId = error !== undefined ? `${fieldId}-error` : undefined;
  const describedBy = [guidanceId, errorId].filter(Boolean).join(" ") || undefined;

  const classes = ["text-field", "type-body"];
  if (className) classes.push(className);

  return (
    <div className="form-field">
      <label htmlFor={fieldId} className="form-label type-label">
        {label}
        {required && <span className="form-required"> (required)</span>}
      </label>
      {guidance !== undefined && (
        <p id={guidanceId} className="form-guidance type-body-small">
          {guidance}
        </p>
      )}
      <input
        id={fieldId}
        className={classes.join(" ")}
        required={required}
        aria-invalid={error !== undefined ? true : undefined}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {error !== undefined && (
        <p id={errorId} className="form-error type-body-small" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
