import { memo } from "react";
import { STATUSES } from "../helpers/defaultData";

function StatusSelect({ value, onChange, noEmptyOption = false }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="status-select"
        >
            {!noEmptyOption && (
                <option value="">Select a status to filter</option>
            )}
            {STATUSES.map(({ id, label }) => (
                <option
                    value={id}
                    key={id}
                >
                    {label}
                </option>
            ))}
        </select>
    );
}

export default memo(StatusSelect);
