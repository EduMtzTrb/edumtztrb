import { WorldThresholdShell } from "@/components/page-shells/PageShell";
import { DistrictField } from "@/components/composition/DistrictField";
import { ActionLink } from "@/components/controls/ActionLink";
import { ThresholdLink } from "@/components/threshold/ThresholdLink";
import { ThresholdIndicator } from "@/components/threshold/ThresholdIndicator";
import { HOME_TO_WORK_ARRIVAL_KEY, WORK_TO_HOME_ARRIVAL_KEY } from "@/lib/threshold/thresholdKeys";

/**
 * Home — M5.1, calibrated after first human review (see
 * docs/implementation/M5.1_HOME.md "Human Review — Calibration Required" /
 * "Calibration Implementation"). The entrance to the platform ("the
 * Threshold Field", HOME_UNIVERSE_v1.1.md §4), not a district page and not
 * a conventional homepage.
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
 * CALIBRATION — the six district thresholds are now the `peripheral` role
 * of the SAME `DistrictField` instance that carries the orientation
 * statement, not a separate block stacked below it. This is what turns
 * "hero, then a nav-like list underneath" into one field with a resolved
 * zone and a latent zone: the districts inherit `DistrictField`'s existing
 * peripheral-latency treatment (color/opacity, M5.0's own calibrated,
 * WCAG-verified pairing) and its compact-width inset/hairline rhythm for
 * free, and share the field's one grid rather than a second, disconnected
 * layout. `density="concentrated"` (unchanged) keeps the orientation
 * statement itself asymmetrically offset (§11.1 controlled asymmetry) —
 * the "hero" now has a real, structural relationship to the district
 * field beside it, rather than being an isolated block above one.
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
        }
      />
    </WorldThresholdShell>
  );
}
