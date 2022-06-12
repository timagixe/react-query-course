import { memo } from "react";
import useLabelData from "../hooks/useLabelData";

function Label({ label }) {
  const labelData = useLabelData(label);

  return (
    labelData && (
      <span className={`label ${labelData.color}`}>{labelData.name}</span>
    )
  );
}

export default memo(Label);
