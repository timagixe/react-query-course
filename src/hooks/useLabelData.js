import useLabelsQuery from "./useLabelsQuery";

export default function useLabelData(labelId) {
  const labelsQuery = useLabelsQuery();
  return labelsQuery.data?.find(({ id }) => id === labelId) ?? null;
}
