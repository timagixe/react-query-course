import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

const issueUrl = (number) => `/api/issues/${number}`;

function fetchIssueFunction({ queryKey: [{ number }] }) {
  return fetchWithError(issueUrl(number));
}

export default function useIssueQuery(number) {
  return useQuery([{ scope: "issue", number }], fetchIssueFunction);
}
