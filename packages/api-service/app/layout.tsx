export const metadata = {
  title: 'Podcast Index API',
  description: 'API service for Podcast Index',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
