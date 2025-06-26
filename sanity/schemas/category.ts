export default {
  name: 'category',
  type: 'document',
  title: 'Categories',
  fields: [
    {
      name: 'name',
      title: 'Name of Category',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Category Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'hasTeams',
      title: 'Has Team Subcategories',
      type: 'boolean',
      description: 'Enable this for categories like "25/26 Season" that have team subdivisions',
      initialValue: false,
    },
    {
      name: 'teams',
      title: 'Teams/Subcategories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Team/Subcategory Name',
              type: 'string',
            },
            {
              name: 'slug',
              title: 'Team Slug',
              type: 'slug',
              options: {
                source: 'name',
              },
            },
          ],
        },
      ],
      hidden: ({ document }: { document: any }) => !document?.hasTeams,
    },
  ],
}
