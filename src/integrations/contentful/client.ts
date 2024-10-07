import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!space || !accessToken) {
  throw new Error('Missing Contentful environment variables.');
}

export const client = createClient({
  space,
  accessToken,
});
