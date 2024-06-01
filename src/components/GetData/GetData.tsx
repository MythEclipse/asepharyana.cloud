async function getData(url: string) {
  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default getData;
