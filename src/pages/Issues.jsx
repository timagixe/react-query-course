import { useState, useCallback } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import StatusSelect from "../components/StatusSelect";

function Issues() {
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState("");

  const onToggleLabel = useCallback((labelId) => {
    setLabels((old) => {
      if (old.includes(labelId)) {
        return old.filter((id) => id !== labelId);
      }
      return old.concat(labelId);
    });
  }, []);

  const onStatusChange = useCallback(
    ({ target: { value } }) => setStatus(value),
    []
  );

  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList selectedLabels={labels} selectedStatus={status} />
        </section>
        <aside>
          <LabelList selectedLabels={labels} onToggleLabel={onToggleLabel} />
          <StatusSelect value={status} onChange={onStatusChange} />
          <hr />
          <Link className="button" to="/add">
            Add Issue
          </Link>
        </aside>
      </main>
    </div>
  );
}

export default memo(Issues);
