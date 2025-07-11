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
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
      description: 'Select the collection/category this product belongs to.'
    }),
    defineField({ name: 'featured', title: 'Featured Product', type: 'boolean', initialValue: false, description: 'Mark this product as featured to show it on the homepage.' }),
  ],
})
