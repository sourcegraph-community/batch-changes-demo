'use client';

import { useState, useTransition } from 'react';
import { Button } from '@podcast-index/shared-ui';
import { subscribeToPostcast } from '@/app/actions';

interface SubscribeButtonProps {
  podcastId: string;
}

export function SubscribeButton({ podcastId }: SubscribeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubscribe = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    startTransition(async () => {
      try {
        await subscribeToPostcast(podcastId, email);
        setIsSubscribed(true);
        setShowModal(false);
        setEmail('');
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to subscribe');
      }
    });
  };

  if (isSubscribed) {
    return (
      <span className="text-sm text-green-600 font-medium flex items-center gap-1">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        Subscribed
      </span>
    );
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowModal(true)}
        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
      >
        Subscribe
      </Button>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Subscribe to podcast
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Enter your email to receive updates when new episodes are released.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-2"
            />
            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
            <div className="flex gap-3 justify-end mt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowModal(false);
                  setEmail('');
                  setError('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubscribe} disabled={isPending}>
                {isPending ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
