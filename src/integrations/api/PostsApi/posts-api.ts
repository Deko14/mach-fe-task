import api from '@/integrations/api/api';

const GET_POSTS_ENDPOINT = '/posts';

// Function to get posts with pagination (page and limit)
export const getPosts = async (page = 1, limit = 100) => {
  const queryParams = `?_start=${(page - 1) * limit}&_limit=${limit}`;
  return (await api()).get(`${GET_POSTS_ENDPOINT}${queryParams}`);
};

// Function to get a post by its id
export const getPostById = async (id: string) => {
  return (await api()).get(`${GET_POSTS_ENDPOINT}/${id}`);
};
