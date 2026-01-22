'use server';

interface Episode {
  id: string;
  title: string;
  description: string;
  podcastName: string;
  podcastId: string;
  duration: number;
  publishedAt: string;
  audioUrl: string;
  imageUrl: string;
}

interface SearchResult {
  query: string;
  results: Episode[];
  total: number;
}

interface SubscribeResult {
  success: boolean;
  message: string;
  subscriberCount: number;
}

const API_BASE = process.env.API_URL || 'http://localhost:3001';

export async function searchEpisodes(query: string): Promise<SearchResult> {
  console.log('Server action: searchEpisodes called with query:', query);

  if (!query || query.trim() === '') {
    console.log('Empty query, returning empty results');
    return { query: '', results: [], total: 0 };
  }

  const response = await fetch(
    `${API_BASE}/api/search?q=${encodeURIComponent(query)}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    console.error('Search API request failed with status:', response.status);
    throw new Error('Failed to search episodes');
  }

  const data = await response.json();
  console.log('Search completed, found', data.total, 'results');
  return data;
}

export async function subscribeToPostcast(
  podcastId: string,
  email: string
): Promise<SubscribeResult> {
  console.log('Server action: subscribeToPostcast called for podcast:', podcastId);

  const response = await fetch(`${API_BASE}/api/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ podcastId, email }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Subscribe API request failed:', error.error);
    throw new Error(error.error || 'Failed to subscribe');
  }

  const data = await response.json();
  console.log('Subscription successful for email:', email);
  return data;
}

export async function getEpisodes(): Promise<Episode[]> {
  console.log('Server action: getEpisodes called');

  const response = await fetch(`${API_BASE}/api/episodes`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    console.error('Episodes API request failed with status:', response.status);
    throw new Error('Failed to fetch episodes');
  }

  const data = await response.json();
  console.log('Fetched', data.episodes.length, 'episodes from API');
  return data.episodes;
}
