import Link from 'next/link';
import { Container } from '@/components/shared/container';

export const Header = () => {
  return (
    <header className="top-0 left-0 w-fullpt-3 border-b mb-10">
      <nav>
        <Container className="flex items-center justify-between py-6 gap-10">
          <Link href="/" title="Homepage">
            Homepage
          </Link>
          <Link href="/posts" title="Posts">
            Explore All Blog Posts
          </Link>
        </Container>
      </nav>
    </header>
  );
};
