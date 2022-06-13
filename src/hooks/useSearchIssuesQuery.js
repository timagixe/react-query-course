import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

function searchIssuesUrl(search) {
  const searchQueryParam = Boolean(search) ? `q=${encodeURI(search)}` : "";
  return `/api/search/issues?${searchQueryParam}`;
}

function fetchSearchIssuesFunction({ queryKey: [{ search }] }) {
  return fetchWithError(searchIssuesUrl(search));
}

export default function useSearchIssuesQuery(search) {
  return useQuery(
    [{ scope: "searchIssues", search }],
    fetchSearchIssuesFunction,
    { enabled: Boolean(search) }
  );
}
