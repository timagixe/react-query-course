import { useMutation, useQueryClient } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

export function addIssue({ title, comment }) {
    return fetchWithError("/api/issues", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title, comment })
    });
}

export default function useAddIssueMutation({ onSuccess }) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addIssue,
        onSuccess: (data) => {
            queryClient.invalidateQueries([{ scope: "issues" }]);
            queryClient.setQueryData(
                [{ scope: "issue", number: data.number.toString() }],
                data
            );
            onSuccess(data);
        }
    });
}
