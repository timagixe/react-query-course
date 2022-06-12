import { useQuery } from "react-query";
import handleResponse from "../helpers/handleResponse";

const commentsUrl = (number) => `/api/issues/${number}/comments`;

function fetchIssuesCommentsFunction({ queryKey: [{ number }] }) {
  return fetch(commentsUrl(number)).then(
    handleResponse({
      onErrorMessage: `Couldn't load comments for issue with issue number of ${number}`,
    })
  );
}

export default function useIssueCommentsQuery(number) {
  return useQuery(
    [{ scope: "issueComments", number }],
    fetchIssuesCommentsFunction
  );
}
