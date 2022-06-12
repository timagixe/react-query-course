import { memo } from "react";

const STATUSES = [
  { id: "backlog", label: "Backlog" },
  { id: "todo", label: "To-do" },
  { id: "inProgress", label: "In Progress" },
  { id: "done", label: "Done" },
  { id: "cancelled", label: "Cancelled" },
];

function StatusSelect({ value, onChange }) {
  return (
    <select value={value} onChange={onChange} className="status-select">
      <option value="">Select a status to filter</option>
      {STATUSES.map(({ id, label }) => (
        <option value={id} key={id}>
          {label}
        </option>
      ))}
    </select>
  );
}

export default memo(StatusSelect);
