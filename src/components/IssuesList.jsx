import useIssuesQuery from "../hooks/useIssuesQuery";
import IssueItem from "./IssueItem";
import { memo } from "react";

function IssuesList({ selectedLabels }) {
  const issuesQuery = useIssuesQuery(selectedLabels);

  return (
    <div>
      <h1>Issues List</h1>
      {issuesQuery.isLoading && <p>Loading...</p>}
      {issuesQuery.isSuccess && (
        <>
          {Boolean(issuesQuery.data.length) ? (
            <ul className="issues-list">
              {issuesQuery.data.map((issue) => (
                <IssueItem
                  key={issue.id}
                  title={issue.title}
                  number={issue.number}
                  assignee={issue.assignee}
                  commentCount={issue.comments.length}
                  createdBy={issue.createdBy}
                  createdDate={issue.createdDate}
                  labels={issue.labels}
                  status={issue.status}
                />
              ))}
            </ul>
          ) : (
            <p>No issues found.</p>
          )}
        </>
      )}
    </div>
  );
}

export default memo(IssuesList);
