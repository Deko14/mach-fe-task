import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPosts } from '@/integrations/api/PostsApi/posts-api';
import { PostI } from '@/utils/types';

export const usePosts = (
  initialPosts: PostI[],
  totalPosts: number,
  postsPerPage = 15
) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const currentPage = parseInt(router.query.page as string) || 1; // Get page number from query or default to 1
  const [posts, setPosts] = useState(initialPosts); // Initialize posts with fetched posts
  const [page, setPage] = useState(currentPage); // Initialize page with currentPage
  const totalPages = Math.ceil(totalPosts / postsPerPage); // Calculate total pages

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

      router.push(`/posts?page=${newPage}`, undefined, { shallow: true });
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Monitor changes in the `router.query.page` parameter and update posts accordingly
  useEffect(() => {
    const newPage = parseInt(router.query.page as string) || 1;
    if (newPage !== page) {
      fetchPosts(newPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.page]);

  return {
    posts,
    loading,
    page,
    totalPages,
    fetchPosts,
  };
};
