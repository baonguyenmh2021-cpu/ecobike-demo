export async function getJson<T>(
  endpoint: string,
): Promise<T> {
  const response = await fetch(`/api${endpoint}`, {
    headers: {
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}