import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ClientFlow Dashboard',
  description:
    'Manage projects, tasks, invoices and clients in one modern agency dashboard.',
  metadataBase: new URL('clientflow.tatjanadevrnja.com'),

  openGraph: {
    title: 'ClientFlow – Agency Dashboard',
    description:
      'All your agency work in one place. Projects, tasks, invoices and more.',
    url: 'https://clientflow.tatjanadevrnja.com/dashboard',
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
    title: 'ClientFlow – Agency Dashboard',
    description: 'Manage projects, tasks and invoices in one clean dashboard.',
    images: ['/ogimage.png'],
  },

  icons: {
    icon: '/favicon.png',
  },
};
