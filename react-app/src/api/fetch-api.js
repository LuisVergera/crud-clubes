export const fetchApi = async () => {
  const response = await fetch();
  const responseJson = await response.json;

  return responseJson;
};
