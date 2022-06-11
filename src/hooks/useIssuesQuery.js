import { useQuery } from "react-query";
import handleResponse from "../helpers/handleResponse";

const issuesUrl = () => "/api/issues";

function queryIssuesFunction() {
  return fetch(issuesUrl()).then(
    handleResponse({ onErrorMessage: "Couldn't load issues list." })
  );
}

export default function useIssuesQuery() {
  return useQuery([{ scope: "issues" }], queryIssuesFunction);
}
