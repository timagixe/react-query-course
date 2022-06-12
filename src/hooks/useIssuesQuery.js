import { useQuery } from "react-query";
import handleResponse from "../helpers/handleResponse";

const issuesUrl = (labels) => {
  const hasLabels = Boolean(labels.length);
  const labelsQueryParams = hasLabels
    ? labels.map((label) => `labels[]=${label}`).join("&")
    : "";
  return `/api/issues?${labelsQueryParams}`;
};

function queryIssuesFunction({ queryKey: [{ labels }] }) {
  return fetch(issuesUrl(labels)).then(
    handleResponse({ onErrorMessage: "Couldn't load issues list." })
  );
}

export default function useIssuesQuery(labels) {
  console.log("TEST");
  return useQuery([{ scope: "issues", labels }], queryIssuesFunction);
}
