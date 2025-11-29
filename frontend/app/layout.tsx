import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const poppins = Poppins({ subsets: ['latin'], weight: ['400','500', '600', '700'] });

export const metadata: Metadata = {
  title: 'AI Prompt Playground',
  description: 'Experiment with different AI models and temperature settings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
         <Toaster />
        </body>
    </html>
  );
}