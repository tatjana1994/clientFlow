import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://clientflow.tatjanadevrnja.com'),
  title: {
    default: 'ClientFlow – Agency Portal',
    template: '%s | ClientFlow',
  },
  description:
    'ClientFlow is a modern agency dashboard to manage projects, tasks, invoices and client communication in one place.',
  openGraph: {
    title: 'ClientFlow – Agency Portal',
    description:
      'Manage projects, tasks, invoices and clients in one clean dashboard.',
    url: 'https://clientflow.tatjanadevrnja.com',
    siteName: 'ClientFlow',
    images: [
      {
        url: '/ogimage.png',
        width: 1200,
        height: 630,
        alt: 'ClientFlow Dashboard',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ClientFlow – Agency Portal',
    description: 'All your agency work in one place.',
    images: ['/ogimage.png'],
  },
  icons: {
    icon: '/favicon.png',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>{children}</body>
    </html>
  );
}
