import { WorldThresholdShell } from "@/components/page-shells/PageShell";
import { ThresholdLink } from "@/components/threshold/ThresholdLink";
import { ThresholdIndicator } from "@/components/threshold/ThresholdIndicator";
import { HOME_TO_WORK_ARRIVAL_KEY, WORK_TO_HOME_ARRIVAL_KEY } from "@/lib/threshold/thresholdKeys";

export default function Home() {
  return (
    <WorldThresholdShell heading="Home">
      <ThresholdIndicator
        arrivalKey={WORK_TO_HOME_ARRIVAL_KEY}
        label="Common ground restored — you were just in Work."
        repeatedLabel="Common ground restored."
      />
      <ThresholdLink href="/work" arrivalKey={HOME_TO_WORK_ARRIVAL_KEY}>
        Enter Work
      </ThresholdLink>
    </WorldThresholdShell>
  );
}
