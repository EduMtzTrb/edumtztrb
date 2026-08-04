# Personal Platform — Technical Architecture

## Purpose

This document defines **how** the Personal Platform is built.

It translates the approved design specifications into engineering principles.

This document does **not** define:

- platform vision
- visual identity
- information architecture
- universe design
- content

Those are defined elsewhere.

This document exists to ensure every implementation follows the same technical philosophy.

---

# Guiding Principles

The engineering should reflect the same values as the design.

## Simplicity

Prefer the simplest solution that satisfies the requirements.

Avoid unnecessary abstraction.

Avoid unnecessary dependencies.

Avoid unnecessary complexity.

---

## Maintainability

The project should remain understandable years from now.

New contributors should quickly understand:

- repository structure
- component hierarchy
- naming
- data flow

---

## Performance

Performance is a feature.

The platform should feel light despite its immersive visual experience.

Every dependency must justify its existence.

---

## Accessibility

Accessibility is part of the architecture.

It is never treated as a later enhancement.

---

## Progressive Enhancement

The platform should function before animations are loaded.

Core navigation must never depend on JavaScript.

---

# Technology Stack

## Framework

Next.js

Reason:

- mature ecosystem
- server rendering
- static generation
- routing
- metadata
- image optimization
- long-term maintainability

---

## Language

TypeScript

Reason:

- reliability
- maintainability
- documentation through types

Avoid unnecessary advanced TypeScript patterns.

Readable types are preferred over clever types.

---

## Styling

CSS Modules

Reason:

- lightweight
- native CSS
- component isolation
- no runtime cost
- beginner friendly

Avoid utility-first frameworks unless there is a demonstrated need.

---

## Animation

Framer Motion

Use only for:

- page transitions
- component transitions
- shared element transitions

Do not animate everything.

Motion should support architecture.

---

## 3D

Three.js

Only use when absolutely required by approved specifications.

Do not introduce Three.js simply because it looks impressive.

The Home Universe should first be evaluated using:

- HTML
- SVG
- CSS
- Motion

before introducing WebGL.

---

## Icons

Lucide Icons

Simple

Consistent

Tree-shakeable

---

## Fonts

Self-hosted whenever possible.

Avoid unnecessary external requests.

---

## Images

Next/Image

Modern formats.

Responsive sizes.

Lazy loading.

---

# Repository Structure

```
PersonalPlatform/

docs/

public/

src/

app/

components/

features/

layouts/

hooks/

lib/

styles/

types/

content/

tests/
```

---

# Documentation Structure

```
docs/

00_Project/

01_Platform/

02_Universes/

03_Design/

04_Technical/

05_Content/

06_Implementation/
```

Approved documents always live inside docs/.

---

# Routing Philosophy

Every universe becomes a top-level route.

```
/

work

research

lab

art

products

about
```

Every universe owns its internal navigation.

---

# Component Philosophy

Components should have one responsibility.

Prefer many small components over large configurable ones.

---

## Component Levels

### Primitive

Buttons

Typography

Icons

Containers

---

### Shared

Navigation

Hero

Footer

Cards

Section

Grid

Breadcrumbs

---

### Universe

Components unique to one universe.

---

### Feature

Complex reusable functionality.

---

# State Management

Default:

React state.

Only introduce global state when clearly necessary.

Avoid heavy state libraries.

---

# Data Philosophy

Content should be separated from components.

Projects should not be hardcoded into React components.

Future content should live independently.

---

# Naming Conventions

Components

PascalCase

```
Hero.tsx
```

Functions

camelCase

```
createNavigation()
```

Variables

Descriptive.

Avoid abbreviations.

---

# CSS Philosophy

Prefer:

Grid

Flexbox

Variables

Container queries

Logical properties

Avoid:

!important

Deep selector nesting

Magic numbers

Duplicated styles

---

# Responsive Strategy

Design mobile-first.

Support:

Mobile

Tablet

Laptop

Desktop

Large desktop

Avoid device-specific hacks.

---

# Performance Strategy

Prioritize:

small bundle size

minimal JavaScript

lazy loading

image optimization

code splitting

CSS over JavaScript

SVG over canvas

Avoid unnecessary rendering.

---

# Accessibility

Every page should include:

semantic HTML

correct heading hierarchy

keyboard navigation

focus visibility

reduced motion

high contrast

accessible labels

screen reader support

---

# SEO

Every page should include:

title

description

OpenGraph

Twitter metadata

structured data where appropriate

canonical URLs

---

# Animations

Animations must follow ANIMATION_SYSTEM.md.

Never invent motion.

Rules:

short

subtle

architectural

purposeful

---

# Testing

Every milestone must pass:

TypeScript

Lint

Production build

Accessibility inspection

Responsive inspection

Navigation inspection

Performance inspection

---

# Git Workflow

Main branch remains stable.

Every implementation milestone uses its own feature branch.

Every merge should include:

implementation

tests

documentation updates

---

# Claude Code Responsibilities

Claude Code implements.

Claude Code does not redesign.

Claude Code must:

- read every approved document before coding
- explain implementation decisions
- write beginner-friendly code
- include educational comments
- avoid unnecessary complexity
- validate every milestone

---

# Codex Responsibilities

Codex reviews.

Codex challenges:

- unnecessary dependencies
- unnecessary abstractions
- performance
- accessibility
- maintainability
- deviations from specifications

Codex does not replace Claude.

---

# ChatGPT Responsibilities

ChatGPT owns:

- vision
- architecture
- UX
- documentation
- critique
- implementation planning

ChatGPT never becomes the primary implementation tool.

---

# Definition of Done

A feature is only complete when:

- implementation matches the approved specification
- tests pass
- accessibility has been verified
- responsive behavior has been verified
- documentation has been updated
- code is beginner-readable
- educational comments have been added
- no unnecessary dependencies have been introduced
- performance remains consistent with platform goals

---

# Technical Principles

Every implementation should satisfy the following:

1. Simpler is better.

2. Readability is more valuable than cleverness.

3. Components should have one responsibility.

4. Every dependency must justify itself.

5. Documentation evolves together with the code.

6. Accessibility is mandatory.

7. Performance is designed, not optimized afterward.

8. Motion reinforces architecture rather than decoration.

9. Approved specifications take precedence over implementation convenience.

10. The platform should remain understandable, maintainable, and extensible for many years.