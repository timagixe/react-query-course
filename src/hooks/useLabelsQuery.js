import { useQuery } from "react-query";
import handleResponse from "../helpers/handleResponse";
import { STALE_TIME } from "../helpers/staleTime";

const labelsUrl = () => "/api/labels";

function queryLabelsFunction() {
  return fetch(labelsUrl()).then(
    handleResponse({
      onErrorMessage: "Couldn't load labels.",
    })
  );
}

export default function useLabelsQuery() {
  return useQuery([{ scope: "labels" }], queryLabelsFunction, {
    staleTime: STALE_TIME.ONE_HOUR,
  });
}
