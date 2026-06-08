import { NextResponse } from 'next/server';
import { subscribe, getPodcastById, getSubscriberCount } from '@/lib/podcast-data';

export async function POST(request: Request) {
  logger.info('Subscribe request received');
  try {
    const body = await request.json();
    const { podcastId, email } = body;

    logger.info('Processing subscription for podcast', { podcastId, 'email:', email });

    if (!podcastId || !email) {
      logger.warn('Missing required fields - podcastId', { podcastId, 'email:', email });
      return NextResponse.json(
        { error: 'podcastId and email are required' },
        { status: 400 }
      );
    }

    const podcast = getPodcastById(podcastId);
    if (!podcast) {
      logger.error('Podcast not found', { podcastId });
      return NextResponse.json(
        { error: 'Podcast not found' },
        { status: 404 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn('Invalid email format', { email });
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const isNew = subscribe(podcastId, email);
    const subscriberCount = getSubscriberCount(podcastId);

    if (!isNew) {
      logger.info('User already subscribed', { email, 'to podcast:', podcastId });
      return NextResponse.json({
        success: true,
        message: 'Already subscribed',
        subscriberCount,
      });
    }

    logger.info('New subscription created - email', { email, 'podcast:', podcast.name, 'total subscribers:', subscriberCount });
    return NextResponse.json({
      success: true,
      message: `Successfully subscribed to ${podcast.name}`,
      subscriberCount,
    });
  } catch (error) {
    logger.error('Failed to process subscription', { error });
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
