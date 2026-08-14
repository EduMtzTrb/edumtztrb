import { WorldThresholdShell } from "@/components/page-shells/PageShell";
import { DistrictField } from "@/components/composition/DistrictField";
import { ActionLink } from "@/components/controls/ActionLink";
import { ThresholdLink } from "@/components/threshold/ThresholdLink";
import { ThresholdIndicator } from "@/components/threshold/ThresholdIndicator";
import { HOME_TO_WORK_ARRIVAL_KEY, WORK_TO_HOME_ARRIVAL_KEY } from "@/lib/threshold/thresholdKeys";

/**
 * Home — M5.1. The entrance to the platform ("the Threshold Field",
 * HOME_UNIVERSE_v1.1.md §4), not a district page and not a conventional
 * homepage. See docs/implementation/M5.1_HOME.md for the full audit,
 * authority citations, and the reasoning behind every decision below.
 *
 * CONTENT BOUNDARY — every visible sentence below is an exact, already-
 * approved quote (cited inline), never invented copy: the heading and
 * orientation paragraph are PLATFORM_VISION.md's own Central Brand Idea
 * and Approved Positioning Statement; the district framing clauses are
 * PLATFORM_SPECIFICATION.md's own canonical operational distinctions. No
 * personal name, project, or achievement is invented — the Approved
 * Authorship Model (PLATFORM_VISION.md §16) requires the platform to
 * operate under the person's real name, which no governing document
 * supplies; that integration is deferred (see the implementation doc's
 * "Deferred" section), not fabricated here.
 *
 * STRUCTURE — one `DistrictField` instance (§9 "Field"/"Orientation";
 * DESIGN_SYSTEM.md §70 Home register: "strongest concentrated void, low
 * default evidence density") carries the orientation statement; the six
 * district thresholds are their own `.home-districts` list (six peer
 * entries do not fit a primary/peripheral pair) using the exact same
 * shared grid tokens. Only Work keeps the real M4.9 `ThresholdLink`/
 * `ThresholdIndicator` wiring — the only district with reciprocal arrival-
 * side treatment; the other five are honest, plain canonical-route links,
 * never a fabricated passage (M5.1's own "no fabricated Home passage").
 */

const DISTRICT_THRESHOLDS = [
  { label: "Work", href: "/work" as const, framing: "Work demonstrates capability." },
  { label: "Research", href: "/research" as const, framing: "Research develops understanding." },
  { label: "Lab", href: "/lab" as const, framing: "Lab tests and transforms." },
  { label: "Art", href: "/art" as const, framing: "Art concentrates perception." },
  { label: "Products", href: "/products" as const, framing: "Products operationalizes value." },
  {
    label: "About",
    href: "/about" as const,
    framing: "About reveals authorship, continuity, and intent.",
  },
] as const;

export default function Home() {
  return (
    <WorldThresholdShell heading="Architectural intelligence across disciplines">
      <ThresholdIndicator
        arrivalKey={WORK_TO_HOME_ARRIVAL_KEY}
        label="Common ground restored — you were just in Work."
        repeatedLabel="Common ground restored."
      />
      <DistrictField
        density="concentrated"
        primary={
          <p className="type-body-large measure">
            A multidisciplinary design practice using architectural thinking to connect space,
            computation, artificial intelligence, research, art, and products.
          </p>
        }
        peripheral={
          <p className="type-annotation">
            Major categories function as districts within the same world.
          </p>
        }
      />
      <section aria-label="Districts">
        <dl className="home-districts">
          {DISTRICT_THRESHOLDS.map((district) => (
            <div key={district.href}>
              <dt className="type-h3">
                {district.href === "/work" ? (
                  <ThresholdLink
                    href="/work"
                    arrivalKey={HOME_TO_WORK_ARRIVAL_KEY}
                    className="link type-label"
                  >
                    {district.label}
                  </ThresholdLink>
                ) : (
                  <ActionLink href={district.href}>{district.label}</ActionLink>
                )}
              </dt>
              <dd className="type-annotation">{district.framing}</dd>
            </div>
          ))}
        </dl>
      </section>
    </WorldThresholdShell>
  );
}
