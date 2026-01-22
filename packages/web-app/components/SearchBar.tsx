'use client';

import { useState, useTransition } from 'react';
import { Input, Button } from '@podcast-index/shared-ui';
import { searchEpisodes } from '@/app/actions';

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

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Episode[]>([]);
  const [isPending, startTransition] = useTransition();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;

    startTransition(async () => {
      const data = await searchEpisodes(query);
      setResults(data.results);
      setHasSearched(true);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search for episodes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
        </div>
        <Button onClick={handleSearch} disabled={isPending || !query.trim()}>
          {isPending ? 'Searching...' : 'Search'}
        </Button>
      </div>

      {hasSearched && (
        <div className="mt-4">
          {results.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md divide-y divide-slate-100">
              {results.map((episode) => (
                <div
                  key={episode.id}
                  className="p-4 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 truncate">
                        {episode.title}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {episode.podcastName}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 py-4">
              No episodes found for &quot;{query}&quot;
            </p>
          )}
        </div>
      )}
    </div>
  );
}
