import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";
import { STALE_TIME } from "../helpers/staleTime";

const issuesUrl = ({ labels, status }) => {
  const hasLabels = Boolean(labels.length);
  const statusQueryParam = status ? `&status=${status}` : "";
  const labelsQueryParam = hasLabels
    ? labels.map((label) => `labels[]=${label}`)
    : "";
  return `/api/issues?${labelsQueryParam}${statusQueryParam}`;
};

function queryIssuesFunction({ queryKey: [{ labels, status }], signal }) {
  return fetchWithError(issuesUrl({ labels, status }), { signal });
}

export default function useIssuesQuery({ labels, status }) {
  return useQuery([{ scope: "issues", labels, status }], queryIssuesFunction, {
    staleTime: STALE_TIME.ONE_MINUTE,
  });
}
