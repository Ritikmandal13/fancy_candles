import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'price', title: 'Price', type: 'string' }),
    defineField({
      name: 'collections',
      title: 'Collections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }]
    }),
    defineField({ name: 'featured', title: 'Featured Candle', type: 'boolean', initialValue: false }),
    defineField({ name: 'cloudinaryUrl', title: 'Cloudinary Image URL', type: 'url' }),
  ],
}) 