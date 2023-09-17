import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
    }),

    defineField({
      type: 'array',
      name: 'images',
      of: [
        defineArrayMember({
          name: 'imageAndAlt',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'alt',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
})
