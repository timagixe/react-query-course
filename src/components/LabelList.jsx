import useLabelsQuery from "../hooks/useLabelsQuery";
import { memo } from "react";

function LabelList({ selectedLabels, onToggleLabel }) {
  const labelsQuery = useLabelsQuery();
  return (
    <div className="labels">
      <h3>Labels</h3>
      {labelsQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {labelsQuery.data.map((label) => {
            return (
              <li key={label.id}>
                <button
                  onClick={() => onToggleLabel(label.id)}
                  className={`label ${
                    selectedLabels.includes(label.id) ? "selected " : ""
                  }${label.color}`}
                >
                  {label.name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default memo(LabelList);
