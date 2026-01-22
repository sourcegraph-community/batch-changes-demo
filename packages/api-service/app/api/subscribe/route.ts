import { NextResponse } from 'next/server';
import { subscribe, getPodcastById, getSubscriberCount } from '@/lib/podcast-data';

export async function POST(request: Request) {
  console.log('Subscribe request received');
  try {
    const body = await request.json();
    const { podcastId, email } = body;

    console.log('Processing subscription for podcast:', podcastId, 'email:', email);

    if (!podcastId || !email) {
      console.warn('Missing required fields - podcastId:', podcastId, 'email:', email);
      return NextResponse.json(
        { error: 'podcastId and email are required' },
        { status: 400 }
      );
    }

    const podcast = getPodcastById(podcastId);
    if (!podcast) {
      console.error('Podcast not found:', podcastId);
      return NextResponse.json(
        { error: 'Podcast not found' },
        { status: 404 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('Invalid email format:', email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const isNew = subscribe(podcastId, email);
    const subscriberCount = getSubscriberCount(podcastId);

    if (!isNew) {
      console.log('User already subscribed:', email, 'to podcast:', podcastId);
      return NextResponse.json({
        success: true,
        message: 'Already subscribed',
        subscriberCount,
      });
    }

    console.log('New subscription created - email:', email, 'podcast:', podcast.name, 'total subscribers:', subscriberCount);
    return NextResponse.json({
      success: true,
      message: `Successfully subscribed to ${podcast.name}`,
      subscriberCount,
    });
  } catch (error) {
    console.error('Failed to process subscription:', error);
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
