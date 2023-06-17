import { useMutation, useQueryClient } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

function issueUrl(number) {
    return `/api/issues/${number}`;
}

function setLabel({ issueNumber, labels }) {
    return fetchWithError(issueUrl(issueNumber), {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ labels })
    });
}

export default function useSetLabelMutation({ labels, issueNumber }) {
    const queryClient = useQueryClient();

    return useMutation(
        (labelId) => {
            const newLabels = labels.includes(labelId)
                ? labels.filter((currentLabel) => currentLabel !== labelId)
                : [...labels, labelId];
            return setLabel({ issueNumber, labels: newLabels });
        },
        {
            onMutate: (labelId) => {
                const oldLabels = queryClient.getQueryData([
                    { scope: "issue", number: issueNumber }
                ]).labels;
                const newLabels = oldLabels.includes(labelId)
                    ? oldLabels.filter((label) => label !== labelId)
                    : [...oldLabels, labelId];

                queryClient.setQueryData([{ scope: "issue", number: issueNumber }], (data) => ({
                    ...data,
                    labels: newLabels
                }));
                return function rollback() {
                    queryClient.setQueryData([{ scope: "issue", number: issueNumber }], (data) => {
                        const rollbackLabels = oldLabels.includes(labelId)
                            ? [...data.labels, labelId]
                            : data.labels.filter((label) => label !== labelId);
                        return {
                            ...data,
                            labels: rollbackLabels
                        };
                    });
                };
            },
            onError: (error, variables, rollback) => {
                rollback();
            },
            onSettled: (data) => {
                queryClient.invalidateQueries([{ scope: "issue", number: issueNumber }], {
                    exact: true
                });
            }
        }
    );
}
