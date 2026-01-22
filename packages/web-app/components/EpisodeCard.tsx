'use client';

import { Card } from '@podcast-index/shared-ui';
import { SubscribeButton } from './SubscribeButton';

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

interface EpisodeCardProps {
  episode: Episode;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes} min`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Card hover className="flex flex-col h-full">
      <div className="relative h-48 bg-gradient-to-br from-purple-500 to-indigo-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-white/30"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {formatDuration(episode.duration)}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span className="font-medium text-purple-600">
            {episode.podcastName}
          </span>
          <span>•</span>
          <span>{formatDate(episode.publishedAt)}</span>
        </div>
        <h4 className="font-semibold text-slate-900 mb-2 line-clamp-2">
          {episode.title}
        </h4>
        <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
          {episode.description}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button className="flex items-center gap-2 text-sm text-slate-600 hover:text-purple-600 transition-colors">
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          <SubscribeButton podcastId={episode.podcastId} />
        </div>
      </div>
    </Card>
  );
}
