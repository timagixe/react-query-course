import { useQuery } from "react-query";
import IssueItem from "./IssueItem";

async function fetchIssues() {
  const url = "api/issues";
  const data = await fetch(url);
  return await data.json();
}

export default function IssuesList() {
  const issuesQuery = useQuery(["issues"], fetchIssues);

  return (
    <div>
      <h1>Issues List</h1>
      {issuesQuery.isLoading && <p>Loading...</p>}
      {issuesQuery.isSuccess && (
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
      )}
    </div>
  );
}
