import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow text-gray-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Oops! Page not found.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
};

export default Custom404;
