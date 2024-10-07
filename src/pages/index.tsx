import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { client } from '@/integrations/contentful/client';
import { Hero } from '@/components/contentful/hero';
import { revalidateDuration } from '@/utils/constants';

const Home = ({
  homeContent,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const components = homeContent.fields.components;

  // Hero Component - Extracted and used here
  const hero = components[0].fields;

  return (
    <Hero
      title={hero.title}
      description={hero.description}
      image={hero.image}
    />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Get only the Homepage content from Contentful by providing the Homepage's id
    const homeContent = await client.getEntry('1tHwz7i5RieUJO253C9stw');

    return {
      props: {
        homeContent,
        revalidate: revalidateDuration,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {},
      revalidate: revalidateDuration,
    };
  }
};

export default Home;
