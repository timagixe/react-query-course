import { useQuery, useQueryClient } from "react-query";
import fetchWithError from "../helpers/fetchWithError";
import { STALE_TIME } from "../helpers/staleTime";

const issuesUrl = ({ labels, status }) => {
  const hasLabels = Boolean(labels.length);
  const statusQueryParam = status ? `&status=${status}` : "";
  const labelsQueryParam = hasLabels
    ? labels.map((label) => `labels[]=${label}`).join("&")
    : "";
  return `/api/issues?${labelsQueryParam}${statusQueryParam}`;
};

function queryIssuesFunction({ queryKey: [{ labels, status }], signal }, queryClient) {
  return fetchWithError(issuesUrl({ labels, status }), { signal }).then(issues => {
    if (Array.isArray(issues)) {
      for (const issue of issues) {
        queryClient.setQueryData(
          [{
            scope: "issue",
            number: String(issue.number)
          }],
          issue
        );
      }
    }
    return issues;
  });
}

export default function useIssuesQuery({ labels, status }) {
  const queryClient = useQueryClient();
  return useQuery(
    [{ scope: "issues", labels, status }],
    (context) => queryIssuesFunction(context, queryClient),
    { staleTime: STALE_TIME.ONE_MINUTE }
  );
}
