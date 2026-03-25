import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Glance',
  description: 'Capture to action - extract events, contacts, and tasks from photos',
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
