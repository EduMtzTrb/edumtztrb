import { useId } from "react";
import type { ReactNode, TextareaHTMLAttributes } from "react";

/**
 * TextAreaField — a native `<textarea>` with the same form-field anatomy
 * as TextField (persistent label, guidance, required, error/explanation,
 * disabled). Kept as its own component rather than sharing an internal
 * wrapper with TextField: the two genuinely different elements (`<input>`
 * vs `<textarea>`) don't share enough real behavior to justify a forced
 * shared primitive, and the small amount of anatomy duplication here
 * matches this project's own established "duplication over premature
 * abstraction" precedent (M2.7/M2.8's own record/media families).
 *
 * No fixed huge height and no custom editor chrome: `min-height` gives a
 * reasonable multi-line starting size, `resize: vertical` lets the user
 * grow it, and native `<textarea>` behavior is otherwise untouched.
 */
export interface TextAreaFieldProps extends Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id"
> {
  label: string;
  guidance?: ReactNode;
  error?: ReactNode;
  id?: string;
}

export function TextAreaField({
  label,
  guidance,
  error,
  required,
  id,
  className,
  ...textareaProps
}: TextAreaFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const guidanceId = guidance !== undefined ? `${fieldId}-guidance` : undefined;
  const errorId = error !== undefined ? `${fieldId}-error` : undefined;
  const describedBy = [guidanceId, errorId].filter(Boolean).join(" ") || undefined;

  const classes = ["textarea-field", "type-body"];
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
      <textarea
        id={fieldId}
        className={classes.join(" ")}
        required={required}
        aria-invalid={error !== undefined ? true : undefined}
        aria-describedby={describedBy}
        {...textareaProps}
      />
      {error !== undefined && (
        <p id={errorId} className="form-error type-body-small" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
