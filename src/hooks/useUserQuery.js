import { useQuery } from "react-query";
import handleResponse from "../helpers/handleResponse";
import { STALE_TIME } from "../helpers/staleTime";

const userUrl = (userId) => `/api/users/${userId}`;

function queryUserFunction({ queryKey: [{ userId }] }) {
  return fetch(userUrl(userId)).then(
    handleResponse({
      onErrorMessage: `Couldn't load data for userId = ${userId}`,
    })
  );
}

export default function useUserQuery(userId) {
  return useQuery([{ scope: "users", userId }], queryUserFunction, {
    enabled: Boolean(userId),
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
}
