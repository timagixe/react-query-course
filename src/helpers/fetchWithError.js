export default async function fetchWithError(url, options) {
  try {
    const response = await fetch(url, options);

    if (response.status === 200) {
      const data = await response.json();

      if ("error" in data) {
        throw new Error(data.error);
      }

      return data;
    }

    throw new Error(`Error ${response.status}: ${response.statusText}`);
  } catch (error) {
    throw new Error(error.message);
  }
}
