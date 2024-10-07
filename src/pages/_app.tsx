import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Layout } from '@/components/templates/layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center font-sans">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  );
}
