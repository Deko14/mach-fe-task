import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { getPosts } from '../../integrations/api/PostsApi/posts-api';
import { Container } from '@/components/shared/container';
import { useState } from 'react';
import { Loader } from '@/components/shared/loader';
import { PostTile } from '@/components/shared/post-tile';

const Posts = ({
  posts: initialPosts,
  totalPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const currentPage = parseInt(router.query.page as string) || 1; // Get page number from query or default to 1
  const [posts, setPosts] = useState(initialPosts); // Initialize posts with fetched posts
  const [page, setPage] = useState(currentPage); // Initialize page with currentPage
  const postsPerPage = 15;
  const totalPages = Math.ceil(totalPosts / postsPerPage); // Calculate total pages

  // Function to fetch posts for the given page
  const fetchPosts = async (newPage: number) => {
    setLoading(true);
    try {
      const res = await getPosts(newPage, postsPerPage);

      if (res.status !== 200) {
        throw new Error('Failed to fetch posts');
      }

      const newPosts = res.data; // Get new posts from the response
      setPosts(newPosts); // Update the posts state
      setPage(newPage); // Update the current page

      // Update the URL with the new page number
      router.push(`/posts?page=${newPage}`, undefined, { shallow: true });
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex-grow flex justify-between flex-col w-full">
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post: { id: number; title: string; body: string }) => (
            <PostTile
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-5">
        <button
          onClick={() => {
            if (page > 1) fetchPosts(page - 1);
          }}
          disabled={page === 1 || loading}
          className="px-4 py-2 bg-gray-700 text-gray-100 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-100">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => {
            if (page < totalPages) fetchPosts(page + 1);
          }}
          disabled={page === totalPages || loading}
          className="px-4 py-2 bg-gray-700 text-gray-100 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const currentPage = parseInt(query.page as string) || 1; // Get page number from query or default to 1

  try {
    const res = await getPosts(currentPage, 15); // Fetch posts based on the page number

    if (res.status !== 200) {
      throw new Error(`Failed to fetch posts, status code: ${res.status}`);
    }

    const posts = await res.data; // Get posts from response
    const totalPosts = res.headers['x-total-count'] || 0; // Get total post count

    return {
      props: {
        posts,
        totalPosts: parseInt(totalPosts, 10), // Convert to number
      },
    };
  } catch (error) {
    console.error('Error fetching posts:', error);

    return {
      props: {
        posts: [],
        totalPosts: 0,
      },
    };
  }
};

export default Posts;
