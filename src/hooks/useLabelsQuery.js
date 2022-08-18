import { useQuery } from "react-query";
import { defaultLabels } from "../helpers/defaultData";
import fetchWithError from "../helpers/fetchWithError";
import { STALE_TIME } from "../helpers/staleTime";

const labelsUrl = () => "/api/labels";

function queryLabelsFunction({ signal }) {
  return fetchWithError(labelsUrl(), { signal });
}

export default function useLabelsQuery() {
  return useQuery([{ scope: "labels" }], queryLabelsFunction, {
    staleTime: STALE_TIME.ONE_HOUR,
    placeholderData: defaultLabels
  });
}
