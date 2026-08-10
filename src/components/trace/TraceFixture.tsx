import { RecordTrace } from "./Trace";
import { createRecordRegistry } from "@/domain/records/registry";
import {
  allFixtureRecords,
  fixtureAboutRecord,
  fixtureResearchRecord,
} from "@/domain/records/fixtures";

/**
 * TraceFixture — M4.10 §C8/§C18. Uses the exact real, already-existing
 * M3.5 fixture relationship graph (`Research —tested-in→ Lab`, the same
 * directional example `INFORMATION_ARCHITECTURE.md` §5.4 itself gives) —
 * never an invented relationship. `fixtureAboutRecord` genuinely has no
 * `relationships` field, demonstrating the negative case for real:
 * "missing relationship produces no visual Trace" (§C20), not merely
 * asserted.
 */
export function TraceFixture() {
  const registry = createRecordRegistry(allFixtureRecords);

  return (
    <div>
      <section>
        <h3>Fixture: a record with a real, stored relationship</h3>
        <RecordTrace source={fixtureResearchRecord} registry={registry} />
      </section>
      <section>
        <h3>Fixture: a record with no relationships (no Trace should appear below)</h3>
        <RecordTrace source={fixtureAboutRecord} registry={registry} />
        <p role="status">
          {`No Trace rendered for "${fixtureAboutRecord.title}" — it has no stored relationship.`}
        </p>
      </section>
    </div>
  );
}
