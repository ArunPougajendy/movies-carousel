const API_BASE = `https://api.themoviedb.org/3/`;

export const fetchApi = async (endPoint: string) => {
  const path = `${API_BASE}${endPoint}`;
  const headersObject: any = {
    'Content-Type': 'application/json',
  };
  const request = {
    headers: headersObject,
    method: 'get',
  };
  try {
    return fetch(path, request);
  } catch (e) {
    const stringError = e && e.toString && e.toString();
    const type =
      stringError === 'TypeError: Network request failed'
        ? 'networkError'
        : 'unknown';
    const error = {
      text: stringError,
      type,
    };
    throw error;
  }
};

export default fetchApi;
