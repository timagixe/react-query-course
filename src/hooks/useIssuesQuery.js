import { useQuery, useQueryClient } from "react-query";
import fetchWithError from "../helpers/fetchWithError";
import { STALE_TIME } from "../helpers/staleTime";

const issuesUrl = ({ labels, status, pageNumber }) => {
    const hasLabels = Boolean(labels.length);
    const statusQueryParam = status ? `status=${status}` : "";
    const labelsQueryParam = hasLabels ? labels.map((label) => `labels[]=${label}`).join("&") : "";
    const pageQueryParam = pageNumber ? `page=${pageNumber}` : "";
    const params = [labelsQueryParam, statusQueryParam, pageQueryParam].filter(Boolean).join("&");
    return `/api/issues?${params}`;
};

function queryIssuesFunction({ queryKey: [{ labels, status, pageNumber }], signal }, queryClient) {
    return fetchWithError(issuesUrl({ labels, status, pageNumber }), { signal }).then((issues) => {
        if (Array.isArray(issues)) {
            for (const issue of issues) {
                queryClient.setQueryData(
                    [
                        {
                            scope: "issue",
                            number: String(issue.number)
                        }
                    ],
                    issue
                );
            }
        }
        return issues;
    });
}

export default function useIssuesQuery({ labels, status, pageNumber }) {
    const queryClient = useQueryClient();
    return useQuery(
        [{ scope: "issues", labels, status, pageNumber }],
        (context) => queryIssuesFunction(context, queryClient),
        { staleTime: STALE_TIME.ONE_MINUTE, keepPreviousData: true }
    );
}
