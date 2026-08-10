import type { ReactNode } from "react";

/**
 * FormConfirmation — the "confirmation hook" this task's own scope asks
 * for: the smallest structural/API capability that lets a form expose
 * successful completion, not the full M2.11 static-state system (no
 * icon, no success animation, no toast, no order-confirmation page). A
 * consumer renders this conditionally once a real submission genuinely
 * succeeds; it does not decide when that is, and it does not clear or
 * replace the surrounding form — that choice stays with the consumer.
 *
 * `role="status"` + `aria-live="polite"` is the standard polite
 * live-region pattern: assistive technology announces the message
 * without interrupting whatever the user is doing, appropriate for a
 * "your changes were saved" confirmation rather than an urgent alert.
 */
interface FormConfirmationProps {
  children: ReactNode;
}

export function FormConfirmation({ children }: FormConfirmationProps) {
  return (
    <p className="form-confirmation type-body-small" role="status" aria-live="polite">
      {children}
    </p>
  );
}
