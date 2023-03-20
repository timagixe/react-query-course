import { useMutation, useQueryClient } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

function setStatus({ number, status }) {
    return fetchWithError(`/api/issues/${number}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ status })
    });
}

export default function useSetStatusMutation(number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (status) => setStatus({ number, status }),
        onMutate: (newStatus) => {
            const oldStatus = queryClient.getQueryData([
                {
                    scope: "issue",
                    number
                }
            ]).status;
            queryClient.setQueryData(
                [
                    {
                        scope: "issue",
                        number
                    }
                ],
                (data) => ({
                    ...data,
                    status: newStatus
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
                        status: oldStatus
                    })
                );
            };
        },
        onError: (error, variables, rollback) => {
            rollback();
        },
        onSettled: () => {
            queryClient.invalidateQueries([{ scope: "issue", number }]);
        }
    });
}
