import { useQuery } from "react-query";
import handleResponse from "../helpers/handleResponse";

const issueUrl = (number) => `/api/issues/${number}`;

function fetchIssueFunction({ queryKey: [{ number }] }) {
  return fetch(issueUrl(number)).then(
    handleResponse({
      onErrorMessage: `Couldn't load issue with issue number of ${number}`,
    })
  );
}

export default function useIssueQuery(number) {
  return useQuery([{ scope: "issue", number }], fetchIssueFunction);
}
