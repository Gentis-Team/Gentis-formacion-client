import http from ".";

export const searchByName = async ({ name, fetchCached }) => {
  const searchParams = new URLSearchParams({
    name,
    fetchCached: String(Number(fetchCached)),
  });

  const { data } = await http.get(`/search?${searchParams}`);
  return data;
};