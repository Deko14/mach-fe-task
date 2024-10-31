import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Container } from '@/components/shared/container';
import { Loader } from '@/components/shared/loader';
import { PostTile } from '@/components/shared/post-tile';
import { Pagination } from '@/components/shared/pagination';
import { getPosts } from '@/integrations/api/PostsApi/posts-api';
import { usePosts } from '@/hooks/usePosts';
import { PostI } from '@/utils/types';

const Posts = ({
  posts: initialPosts,
  totalPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { posts, loading, page, totalPages, fetchPosts } = usePosts(
    initialPosts,
    totalPosts
  );

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
      <Pagination
        page={page}
        totalPages={totalPages}
        loading={loading}
        fetchPosts={fetchPosts}
      />
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

    const posts: PostI = res.data; // Get posts from response
    const totalPosts: string = res.headers['x-total-count'] || 0; // Get total post count

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
