import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Festive', value: 'Festive' },
          { title: 'Gifting candles', value: 'Gifting candles' },
          { title: 'Return gifts', value: 'return gifts' },
          { title: 'Home decor', value: 'home decor' },
        ],
      },
    }),
  ],
})