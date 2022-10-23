const BASE_URL = 'http://localhost:8080/';

const fetchApi = async (resourceUrl) => {
  const response = await fetch(resourceUrl);

  if (!response.ok) {
    throw new Error('API Error');
  }
  return response.json();
};

const apiClubes = {
  searchClubById: (id) => fetchApi(`${BASE_URL}club/${id}`),
};

export default apiClubes;
