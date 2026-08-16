"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";

import { TextField } from "@/components/form/TextField";
import { TextAreaField } from "@/components/form/TextAreaField";
import { Action } from "@/components/controls/Action";
import { UnavailableState } from "@/components/state/UnavailableState";

/**
 * ContactForm — M6.1, orchestrated per M6.4 (see
 * docs/implementation/M6.1_CONTACT.md /
 * docs/implementation/M6.4_UTILITY_STATES.md).
 *
 * Authority: `ABOUT_UNIVERSE_v1.1.md` §18 — "Required fields: name, reply
 * address, message. Avoid: mandatory phone number, marketing consent,
 * budget interrogation before conversation, hidden direct contact
 * information." `PLATFORM_SPECIFICATION.md` §34 — "identify the recipient/
 * practice, use clear message purpose/pathway where needed, label actions
 * literally, state submission status, preserve entered information after
 * recoverable failure where possible, avoid sales-funnel pressure... Exact
 * public contact details are a content decision."
 *
 * CRITICAL RULE THIS COMPONENT EXISTS TO HONOR — never make a form appear
 * functional when no truthful delivery mechanism exists. No approved
 * recipient email, form-processing provider, server action, or API route
 * exists anywhere in this repository (audited fresh for M6-A; see
 * docs/implementation/M6.1_CONTACT.md "Delivery Mechanism Audit"). This
 * component therefore implements the complete accessible presentation —
 * persistent labels, guidance, required-state, real client-side
 * validation, field-level errors, focus management, and safe preservation
 * of entered values after a recoverable failure — but a valid submission
 * attempt renders an honest `UnavailableState`, never a fabricated
 * `FormConfirmation`. Nothing is transmitted, stored, or discarded
 * silently; the visitor is told plainly that no delivery destination
 * exists yet.
 *
 * Reuses M2.10 (`TextField`/`TextAreaField`) and M2.11 (`UnavailableState`)
 * unmodified — no Contact-specific form primitive was created.
 */

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Enter your name.";
  if (!email.trim()) errors.email = "Enter a reply email address.";
  else if (!EMAIL_PATTERN.test(email.trim())) errors.email = "Enter a valid email address.";
  if (!message.trim()) errors.message = "Enter a message.";
  return errors;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [attempted, setAttempted] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(name, email, message);
    setErrors(nextErrors);
    setAttempted(true);

    if (nextErrors.name) {
      nameRef.current?.focus();
    } else if (nextErrors.email) {
      emailRef.current?.focus();
    } else if (nextErrors.message) {
      messageRef.current?.focus();
    }
  }

  const hasErrors = Object.keys(errors).length > 0;
  const validAttempt = attempted && !hasErrors;

  if (validAttempt) {
    return (
      <UnavailableState
        heading="This message was not sent."
        reason="Contact is not yet connected to a real delivery destination — this is a content/configuration gap (Milestone 6.6), not a rejection of your message. Nothing you entered was transmitted or stored."
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        ref={nameRef}
        label="Name"
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={attempted ? errors.name : undefined}
        autoComplete="name"
      />
      <TextField
        ref={emailRef}
        label="Reply email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={attempted ? errors.email : undefined}
        guidance="Used only to reply to your message."
        autoComplete="email"
      />
      <TextAreaField
        ref={messageRef}
        label="Message"
        required
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        error={attempted ? errors.message : undefined}
      />
      <Action type="submit">Send message</Action>
    </form>
  );
}
