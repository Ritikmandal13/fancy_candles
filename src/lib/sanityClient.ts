import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = '0fcy3bk5'; // Actual project ID from sanity.config.ts
const dataset = 'production'; // Actual dataset from sanity.config.ts
const apiVersion = '2023-01-01'; // Use today's date or your preferred API version

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source) {
  return builder.image(source);
} 