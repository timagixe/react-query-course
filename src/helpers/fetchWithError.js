export default async function fetchWithError(url, options) {
    try {
        const response = await fetch(url, options);
        const isOkResponse = response.status >= 200 && response.status < 300;
        if (!isOkResponse) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        if ("error" in data) throw new Error(data.error);
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
