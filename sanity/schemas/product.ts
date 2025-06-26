export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of Product',
    },
    {
      name: 'images',
      type: 'array',
      title: 'Product Images',
      of: [{type: 'image'}],
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description of product',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Product Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'size',
      title: 'Available Sizes',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ],
      options: {
        list: [
          { title: 'Extra Small (XS)', value: 'XS' },
          { title: 'Small (S)', value: 'S' },
          { title: 'Medium (M)', value: 'M' },
          { title: 'Large (L)', value: 'L' },
          { title: 'Extra Large (XL)', value: 'XL' },
          { title: 'Double Extra Large (XXL)', value: 'XXL' },
          { title: 'Triple Extra Large (XXXL)', value: 'XXXL' }
        ]
      }
    },
    {
      name: 'price_id',
      title: 'Stripe Price ID',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [
        {
          type: 'category',
        },
      ],
    },
    {
      name: 'team',
      title: 'Team/Club (for Football Jerseys)',
      type: 'string',
      description: 'Specify the team/club name for jerseys (e.g., Manchester United, Barcelona, etc.)',
    },
    {
      name: 'season',
      title: 'Season (for Football Jerseys)',
      type: 'string',
      description: 'Specify the season (e.g., 2025/26, Vintage)',
      options: {
        list: [
          { title: '2025/26 Season', value: '2025/26' },
          { title: 'Vintage', value: 'Vintage' },
        ]
      }
    },
  ],
}
