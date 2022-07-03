import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";
import { STALE_TIME } from "../helpers/staleTime";

const userUrl = (userId) => `/api/users/${userId}`;

function queryUserFunction({ queryKey: [{ userId }], signal }) {
  return fetchWithError(userUrl(userId), { signal });
}

export default function useUserQuery(userId) {
  return useQuery([{ scope: "users", userId }], queryUserFunction, {
    enabled: Boolean(userId),
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
}
