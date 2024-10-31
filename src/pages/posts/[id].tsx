import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import {
  getPosts,
  getPostById,
} from '../../integrations/api/PostsApi/posts-api';
import { Container } from '@/components/shared/container';
import { client } from '@/integrations/contentful/client';
import { Banner } from '@/components/contentful/banner';
import { revalidateDuration } from '@/utils/constants';
import { PostI } from '@/utils/types';

const Post = ({
  post,
  postContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const components = postContent.fields.components;

  // Banner Component - START
  const hero = components[0].fields;
  const { title, date } = hero;
  // Banner Component - END

  return (
    <Container className="flex-grow flex flex-col justify-center items-center p-5 w-full text-center">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">{post.title}</h1>
      <p className="text-lg text-gray-200 w-full">{post.body}</p>
      <Banner title={title} date={date} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    // Get only the Postpage content from Contentful by providing the Postpage's id
    const postContent = await client.getEntry('4tuXBg76lPewTrQaOODC9U');

    const res = await getPostById(id);

    if (res.status !== 200) {
      throw new Error(`Failed to fetch post, status code: ${res.status}`);
    }

    const post: PostI = res.data;

    return {
      props: {
        post,
        postContent,
        revalidate: revalidateDuration,
      },
    };
  } catch (error) {
    console.error('Error fetching post:', error);

    return {
      props: {
        post: null,
        revalidate: revalidateDuration,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await getPosts();

    if (res.status !== 200) {
      throw new Error(`Failed to fetch posts, status code: ${res.status}`);
    }

    const posts: PostI[] = res.data;

    const paths = posts.map((post: PostI) => ({
      params: { id: post.id.toString() },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      paths: [],
      fallback: false,
    };
  }
};

export default Post;
