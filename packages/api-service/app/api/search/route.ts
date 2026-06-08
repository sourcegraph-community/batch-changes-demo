import { NextResponse } from 'next/server';
import { searchEpisodes } from '@/lib/podcast-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  logger.info('Search request received, query', { query });

  if (!query || query.trim() === '') {
    logger.warn('Empty search query received');
    return NextResponse.json(
      { error: 'Search query is required' },
      { status: 400 }
    );
  }

  const results = searchEpisodes(query);
  logger.info('Search completed, found', { value: results.length, 'results for query:', query });
  return NextResponse.json({
    query,
    results,
    total: results.length,
  });
}
