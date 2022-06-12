import { useQuery } from "react-query";
import handleResponse from "../helpers/handleResponse";

const labelsUrl = () => "/api/labels";

function queryLabelsFunction() {
  return fetch(labelsUrl()).then(
    handleResponse({
      onErrorMessage: "Couldn't load labels.",
    })
  );
}

export default function useLabelsQuery() {
  return useQuery(["labels"], queryLabelsFunction);
}
