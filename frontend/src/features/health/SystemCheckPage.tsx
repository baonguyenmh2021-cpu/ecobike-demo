import { useEffect, useState } from 'react';
import { getJson } from '../../services/http-client';

type HealthResponse = {
  status: string;
  application: string;
  database: {
    database: string;
    total_tables: number;
    total_products: number;
  };
};

export default function SystemCheckPage() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function check() {
    setLoading(true);
    setError('');
    setData(null);

    try {
      setData(await getJson<HealthResponse>('/health/database'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void check();
  }, []);

  const metrics = [
    ['Frontend', 'React'],
    ['Backend', data?.status ?? '-'],
    ['Database', data?.database.database ?? '-'],
    ['Tables', data?.database.total_tables ?? '-'],
    ['Products', data?.database.total_products ?? '-'],
  ];

  return (
    <main className="mx-auto max-w-5xl p-8">
      <p className="text-sm text-gray-500">
        ECOBIKE MANAGEMENT SYSTEM
      </p>

      <h1 className="my-4 text-3xl font-bold">
        System Connection Test
      </h1>

      <div className="my-6 rounded-lg border bg-white p-5">
        {loading
          ? 'Checking connection...'
          : data?.status === 'UP'
            ? 'All systems connected'
            : 'Connection failed'}
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map(([label, value]) => (
          <article
            key={label}
            className="rounded-lg border bg-white p-5"
          >
            <p className="text-gray-500">{label}</p>
            <h2 className="mt-2 text-xl font-bold">{value}</h2>
          </article>
        ))}
      </section>

      {error && (
        <p className="my-4 text-red-600">{error}</p>
      )}

      <button
        className="my-6 rounded bg-green-700 px-5 py-3 text-white disabled:opacity-50"
        onClick={() => void check()}
        disabled={loading}
      >
        Check again
      </button>

      <h2 className="mb-3 font-bold">API Response</h2>

      <pre className="overflow-auto rounded-lg border bg-white p-5">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}