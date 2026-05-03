import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://clientflow.tatjanadevrnja.com'),

  title: {
    default: 'ClientFlow – Agency Portal',
    template: '%s | ClientFlow',
  },

  description:
    'ClientFlow is a modern agency dashboard to manage projects, tasks, invoices and client communication in one place.',

  keywords: [
    'client portal',
    'agency dashboard',
    'project management',
    'task management',
    'invoices',
    'saas dashboard',
  ],

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
    description:
      'All your agency work in one place. Projects, tasks and invoices.',
    images: ['/ogimage.png'],
  },

  icons: {
    icon: '/favicon.png',
  },

  alternates: {
    canonical: 'https://clientflow.tatjanadevrnja.com',
  },
};
