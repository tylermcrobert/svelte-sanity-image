export default {
  name: 'post',
  type: 'document',
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'array',
      name: 'images',
      of: [
        {
          name: 'img',
          type: 'object',
          fields: [
            {
              name: 'asset',
              type: 'image',
            },
            {
              name: 'alt',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
}
