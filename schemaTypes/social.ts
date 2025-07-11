import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'social',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
  ],
}) 