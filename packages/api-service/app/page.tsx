export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1>Podcast Index API</h1>
      <p>Available endpoints:</p>
      <ul>
        <li><code>GET /api/episodes</code> - List all episodes</li>
        <li><code>GET /api/search?q=query</code> - Search episodes</li>
        <li><code>POST /api/subscribe</code> - Subscribe to a podcast</li>
      </ul>
    </main>
  );
}
