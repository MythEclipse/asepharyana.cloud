export async function getData(url: string) {
  const res = await fetch(url, {
    cache: 'force-cache'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function getDataNC(url: string) {
  const res = await fetch(url, {
    cache: 'no-cache'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
