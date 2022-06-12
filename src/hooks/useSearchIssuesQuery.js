import { useQuery } from "react-query";
import handleResponse from "../helpers/handleResponse";

function searchIssuesUrl(search) {
  const searchQueryParam = Boolean(search) ? `q=${encodeURI(search)}` : "";
  return `/api/search/issues?${searchQueryParam}`;
}

function fetchSearchIssuesFunction({ queryKey: [{ search }] }) {
  return fetch(searchIssuesUrl(search)).then(
    handleResponse({ onErrorMessage: `Couldn't loading issues for: ${search}` })
  );
}

export default function useSearchIssuesQuery(search) {
  return useQuery(
    [{ scope: "searchIssues", search }],
    fetchSearchIssuesFunction,
    { enabled: Boolean(search) }
  );
}
