export interface Episode {
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

export interface Podcast {
  id: string;
  name: string;
  author: string;
  description: string;
  imageUrl: string;
  feedUrl: string;
  category: string;
}

export const podcasts: Podcast[] = [
  {
    id: 'tech-weekly',
    name: 'Tech Weekly',
    author: 'Sarah Chen',
    description: 'Weekly deep dives into the latest technology trends, startup news, and developer tools.',
    imageUrl: 'https://picsum.photos/seed/tech/400/400',
    feedUrl: 'https://example.com/feeds/tech-weekly.xml',
    category: 'Technology',
  },
  {
    id: 'code-stories',
    name: 'Code Stories',
    author: 'Marcus Johnson',
    description: 'Behind-the-scenes stories from software engineers building products at scale.',
    imageUrl: 'https://picsum.photos/seed/code/400/400',
    feedUrl: 'https://example.com/feeds/code-stories.xml',
    category: 'Technology',
  },
  {
    id: 'devops-digest',
    name: 'DevOps Digest',
    author: 'Elena Rodriguez',
    description: 'Infrastructure, CI/CD, and cloud architecture discussions for modern teams.',
    imageUrl: 'https://picsum.photos/seed/devops/400/400',
    feedUrl: 'https://example.com/feeds/devops-digest.xml',
    category: 'Technology',
  },
  {
    id: 'open-source-hour',
    name: 'Open Source Hour',
    author: 'David Kim',
    description: 'Interviews with maintainers of popular open source projects.',
    imageUrl: 'https://picsum.photos/seed/oss/400/400',
    feedUrl: 'https://example.com/feeds/open-source-hour.xml',
    category: 'Technology',
  },
];

export const episodes: Episode[] = [
  {
    id: 'ep-001',
    title: 'The Rise of AI Code Assistants',
    description: 'We explore how AI is changing the way developers write code, from autocomplete to full code generation.',
    podcastName: 'Tech Weekly',
    podcastId: 'tech-weekly',
    duration: 2847,
    publishedAt: '2025-01-15T10:00:00Z',
    audioUrl: 'https://example.com/audio/ep-001.mp3',
    imageUrl: 'https://picsum.photos/seed/ai/400/400',
  },
  {
    id: 'ep-002',
    title: 'Building GitHub from Scratch',
    description: 'An engineer shares the architectural decisions behind building a Git hosting platform.',
    podcastName: 'Code Stories',
    podcastId: 'code-stories',
    duration: 3654,
    publishedAt: '2025-01-14T10:00:00Z',
    audioUrl: 'https://example.com/audio/ep-002.mp3',
    imageUrl: 'https://picsum.photos/seed/github/400/400',
  },
  {
    id: 'ep-003',
    title: 'Kubernetes at Scale: Lessons Learned',
    description: 'Managing thousands of containers in production - the good, the bad, and the ugly.',
    podcastName: 'DevOps Digest',
    podcastId: 'devops-digest',
    duration: 2156,
    publishedAt: '2025-01-13T10:00:00Z',
    audioUrl: 'https://example.com/audio/ep-003.mp3',
    imageUrl: 'https://picsum.photos/seed/k8s/400/400',
  },
  {
    id: 'ep-004',
    title: 'Inside the React Core Team',
    description: 'Exclusive interview with React maintainers about the future of the framework.',
    podcastName: 'Open Source Hour',
    podcastId: 'open-source-hour',
    duration: 4023,
    publishedAt: '2025-01-12T10:00:00Z',
    audioUrl: 'https://example.com/audio/ep-004.mp3',
    imageUrl: 'https://picsum.photos/seed/react/400/400',
  },
  {
    id: 'ep-005',
    title: 'WebAssembly: The Future of Web Apps',
    description: 'How WASM is enabling new possibilities for performance-critical web applications.',
    podcastName: 'Tech Weekly',
    podcastId: 'tech-weekly',
    duration: 2589,
    publishedAt: '2025-01-11T10:00:00Z',
    audioUrl: 'https://example.com/audio/ep-005.mp3',
    imageUrl: 'https://picsum.photos/seed/wasm/400/400',
  },
  {
    id: 'ep-006',
    title: 'Debugging Production: War Stories',
    description: 'Engineers share their most challenging production debugging experiences.',
    podcastName: 'Code Stories',
    podcastId: 'code-stories',
    duration: 3211,
    publishedAt: '2025-01-10T10:00:00Z',
    audioUrl: 'https://example.com/audio/ep-006.mp3',
    imageUrl: 'https://picsum.photos/seed/debug/400/400',
  },
  {
    id: 'ep-007',
    title: 'GitOps and the Future of Deployment',
    description: 'Using Git as the single source of truth for infrastructure and application state.',
    podcastName: 'DevOps Digest',
    podcastId: 'devops-digest',
    duration: 2734,
    publishedAt: '2025-01-09T10:00:00Z',
    audioUrl: 'https://example.com/audio/ep-007.mp3',
    imageUrl: 'https://picsum.photos/seed/gitops/400/400',
  },
  {
    id: 'ep-008',
    title: 'The Rust Revolution',
    description: 'Why systems programmers are falling in love with Rust and its memory safety guarantees.',
    podcastName: 'Open Source Hour',
    podcastId: 'open-source-hour',
    duration: 3567,
    publishedAt: '2025-01-08T10:00:00Z',
    audioUrl: 'https://example.com/audio/ep-008.mp3',
    imageUrl: 'https://picsum.photos/seed/rust/400/400',
  },
];

export function getEpisodes(): Episode[] {
  console.log('getEpisodes: fetching all episodes');
  return episodes;
}

export function getEpisodeById(id: string): Episode | undefined {
  console.log('getEpisodeById: looking up episode with id:', id);
  const episode = episodes.find((ep) => ep.id === id);
  if (!episode) {
    console.warn('getEpisodeById: episode not found for id:', id);
  }
  return episode;
}

export function searchEpisodes(query: string): Episode[] {
  console.log('searchEpisodes: searching for query:', query);
  const lowerQuery = query.toLowerCase();
  const results = episodes.filter(
    (ep) =>
      ep.title.toLowerCase().includes(lowerQuery) ||
      ep.description.toLowerCase().includes(lowerQuery) ||
      ep.podcastName.toLowerCase().includes(lowerQuery)
  );
  console.log('searchEpisodes: found', results.length, 'matching episodes');
  return results;
}

export function getPodcasts(): Podcast[] {
  console.log('getPodcasts: fetching all podcasts');
  return podcasts;
}

export function getPodcastById(id: string): Podcast | undefined {
  console.log('getPodcastById: looking up podcast with id:', id);
  const podcast = podcasts.find((p) => p.id === id);
  if (!podcast) {
    console.warn('getPodcastById: podcast not found for id:', id);
  }
  return podcast;
}

const subscribers = new Map<string, Set<string>>();

export function subscribe(podcastId: string, email: string): boolean {
  console.log('subscribe: attempting to subscribe email:', email, 'to podcast:', podcastId);
  if (!subscribers.has(podcastId)) {
    subscribers.set(podcastId, new Set());
  }
  const podcastSubscribers = subscribers.get(podcastId)!;
  if (podcastSubscribers.has(email)) {
    console.log('subscribe: email already subscribed:', email);
    return false;
  }
  podcastSubscribers.add(email);
  console.log('subscribe: new subscription added, total subscribers:', podcastSubscribers.size);
  return true;
}

export function getSubscriberCount(podcastId: string): number {
  const count = subscribers.get(podcastId)?.size ?? 0;
  console.log('getSubscriberCount: podcast', podcastId, 'has', count, 'subscribers');
  return count;
}
