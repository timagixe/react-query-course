import { useMutation, useQueryClient } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

function setAssignee({ number, assignee }) {
    return fetchWithError(`/api/issues/${number}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ assignee })
    });
}

export default function useSetAssigneeMutation(number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (assignee) => setAssignee({ number, assignee }),
        onMutate: (newAssignee) => {
            const oldAssignee = queryClient.getQueryData([
                {
                    scope: "issue",
                    number
                }
            ]).assignee;
            queryClient.setQueryData(
                [
                    {
                        scope: "issue",
                        number
                    }
                ],
                (data) => ({
                    ...data,
                    assignee: newAssignee
                })
            );
            return function rollback() {
                queryClient.setQueryData(
                    [
                        {
                            scope: "issue",
                            number
                        }
                    ],
                    (data) => ({
                        ...data,
                        assignee: oldAssignee
                    })
                );
            };
        },
        onError: (error, variables, rollback) => {
            rollback();
        },
        onSettled: () => {
            queryClient.invalidateQueries([{ scope: "issue", number }]);
            queryClient.invalidateQueries([{ scope: "issues" }]);
        }
    });
}
