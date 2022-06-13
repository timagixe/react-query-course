import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";
import { STALE_TIME } from "../helpers/staleTime";

const labelsUrl = () => "/api/labels";

function queryLabelsFunction() {
  return fetchWithError(labelsUrl());
}

export default function useLabelsQuery() {
  return useQuery([{ scope: "labels" }], queryLabelsFunction, {
    staleTime: STALE_TIME.ONE_HOUR,
  });
}
