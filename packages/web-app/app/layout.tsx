import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Podcast Index',
  description: 'Discover and subscribe to your favorite podcasts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 audio-gradient rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-slate-900">
                  Podcast Index
                </h1>
              </div>
              <nav className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 font-medium"
                >
                  Discover
                </a>
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 font-medium"
                >
                  Library
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
