import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

const commentsUrl = (number) => `/api/issues/${number}/comments`;

export function fetchIssuesCommentsFunction({ queryKey: [{ number }], signal }) {
  return fetchWithError(commentsUrl(number), { signal });
}

export default function useIssueCommentsQuery(number) {
  return useQuery(
    [{ scope: "issueComments", number }],
    fetchIssuesCommentsFunction
  );
}
