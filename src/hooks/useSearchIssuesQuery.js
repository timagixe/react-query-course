import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

function searchIssuesUrl(search) {
  const searchQueryParam = Boolean(search) ? `q=${encodeURI(search)}` : "";
  return `/api/search/issues?${searchQueryParam}`;
}

function fetchSearchIssuesFunction({ queryKey: [{ search }], signal }) {
  return fetchWithError(searchIssuesUrl(search), { signal });
}

export default function useSearchIssuesQuery(search) {
  return useQuery(
    [{ scope: "searchIssues", search }],
    fetchSearchIssuesFunction,
    { enabled: Boolean(search) }
  );
}
