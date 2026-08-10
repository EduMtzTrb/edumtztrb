import type { InputHTMLAttributes, ReactNode } from "react";

/**
 * Checkbox — a native <input type="checkbox"> wrapped in its own <label>
 * (implicit label association, no generated id/htmlFor bookkeeping
 * needed). The input is visually hidden (`.visually-hidden-input`, never
 * `display: none`) so it stays in the accessibility tree, focusable and
 * keyboard-operable; a decorative sibling draws the checked/unchecked
 * box. Checked state is communicated by a filled box *and* an explicit
 * checkmark shape (src/styles/selection.css), never color alone.
 */
interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Checkbox({ label, className, ...inputProps }: CheckboxProps) {
  const classes = ["checkbox"];
  if (className) classes.push(className);

  return (
    <label className={classes.join(" ")}>
      <input type="checkbox" className="visually-hidden-input" {...inputProps} />
      <span className="checkbox-box" aria-hidden="true" />
      <span className="checkbox-label-text type-body">{label}</span>
    </label>
  );
}
