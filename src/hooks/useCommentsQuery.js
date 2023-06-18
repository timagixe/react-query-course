import { useInfiniteQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

const commentsUrl = ({ number, pageParam }) => `/api/issues/${number}/comments?page=${pageParam}`;

export function fetchIssuesCommentsFunction({ queryKey: [{ number }], signal, pageParam = 1 }) {
    return fetchWithError(commentsUrl({ number, pageParam }), { signal });
}

export default function useIssueCommentsQuery(number) {
    return useInfiniteQuery([{ scope: "issueComments", number }], fetchIssuesCommentsFunction, {
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return;
            return pages.length + 1;
        }
    });
}
