export default function isIdleLoading(query) {
  return query.fetchStatus === "idle" && query.isLoading;
}
