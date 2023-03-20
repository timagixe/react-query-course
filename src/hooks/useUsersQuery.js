import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";
import { STALE_TIME } from "../helpers/staleTime";

function queryUserFunction({ signal }) {
    return fetchWithError("/api/users/", { signal });
}

export default function useUsersQuery() {
    return useQuery([{ scope: "users" }], queryUserFunction, {
        staleTime: STALE_TIME.FIVE_MINUTES
    });
}
