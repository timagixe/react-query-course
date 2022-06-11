export default function handleResponse({
  onErrorMessage = "Something went wrong.",
}) {
  return (data) => {
    if (data.status !== 200) {
      throw Error(onErrorMessage);
    }
    return data.json();
  };
}
