import { useState, useCallback } from "react";
import { memo } from "react";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";

function Issues() {
  const [selectedLabels, setSelectedLabels] = useState([]);

  const onToggleLabel = useCallback((labelId) => {
    setSelectedLabels((old) => {
      if (old.includes(labelId)) {
        return old.filter((id) => id !== labelId);
      }
      return old.concat(labelId);
    });
  }, []);

  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList selectedLabels={selectedLabels} />
        </section>
        <aside>
          <LabelList
            selectedLabels={selectedLabels}
            onToggleLabel={onToggleLabel}
          />
        </aside>
      </main>
    </div>
  );
}

export default memo(Issues);
