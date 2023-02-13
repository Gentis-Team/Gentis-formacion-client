import http from ".";

export const searchByTitle = async ({ name, fetchCached }) => {
  const searchParams = new URLSearchParams({
    name,
    fetchCached: String(Number(fetchCached)),
  });

  const { data } = await http.get(`/courses?${searchParams}`);
  return data;
};