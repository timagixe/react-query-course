import { memo } from "react";
import StatusSelect from "./StatusSelect";
import useSetStatusMutation from "../hooks/useSetStatusMutation";

function IssueStatus({ status, issueNumber }) {
    const setStatusMutation = useSetStatusMutation(issueNumber);
    return (
        <div className="issue-options">
            <div>
                <span>Status</span>
                <StatusSelect
                    noEmptyOption
                    value={status}
                    onChange={(event) =>
                        setStatusMutation.mutate(event.target.value)
                    }
                />
            </div>
        </div>
    );
}

export default memo(IssueStatus);
