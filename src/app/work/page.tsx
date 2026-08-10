import { DistrictOverviewShell } from "@/components/page-shells/PageShell";
import { ThresholdLink } from "@/components/threshold/ThresholdLink";
import { ThresholdIndicator } from "@/components/threshold/ThresholdIndicator";
import { HOME_TO_WORK_ARRIVAL_KEY, WORK_TO_HOME_ARRIVAL_KEY } from "@/lib/threshold/thresholdKeys";

export default function WorkPage() {
  return (
    <DistrictOverviewShell heading="Work">
      <ThresholdIndicator
        arrivalKey={HOME_TO_WORK_ARRIVAL_KEY}
        label="Arriving from Home — Work is part of the same platform."
        repeatedLabel="Arriving from Home."
      />
      <ThresholdLink href="/" arrivalKey={WORK_TO_HOME_ARRIVAL_KEY}>
        Return to Home
      </ThresholdLink>
    </DistrictOverviewShell>
  );
}
