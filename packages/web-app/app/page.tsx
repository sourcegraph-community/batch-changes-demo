import { Suspense } from 'react';
import { getEpisodes } from './actions';
import { SearchBar } from '@/components/SearchBar';
import { EpisodeCard } from '@/components/EpisodeCard';

async function EpisodeList() {
  const episodes = await getEpisodes();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {episodes.map((episode) => (
        <EpisodeCard key={episode.id} episode={episode} />
      ))}
    </div>
  );
}

function EpisodeListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-slate-200" />
          <div className="p-6">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-1/2 mb-4" />
            <div className="h-3 bg-slate-200 rounded w-full mb-2" />
            <div className="h-3 bg-slate-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Discover Amazing Podcasts
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Search through thousands of episodes from the best tech podcasts.
            Subscribe to stay updated with the latest content.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <SearchBar />
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          Latest Episodes
        </h3>
        <Suspense fallback={<EpisodeListSkeleton />}>
          <EpisodeList />
        </Suspense>
      </section>
    </div>
  );
}
