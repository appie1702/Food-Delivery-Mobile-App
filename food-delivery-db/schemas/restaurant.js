import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'short_desc',
      title: 'Short Description',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image of the Restaurant',
      type: 'image',
    }),
    defineField({
      name: 'long',
      title: 'Longitude of the Restaurant',
      type: 'number',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude of the Restaurant',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'Restaurant address',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rate this restaurant form 1 to 5 stars',
      type: 'number',
      validation: Rule => Rule.required()
        .min(1)
        .max(5)
        .error("Please enter a value between 1 to 5")
    }),
    defineField({
      name: 'type',
      title: 'Category',
      type: "reference",
      to: [{type:"category"}],
      description: "Category this restaurant falls in",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'dishes',
      title: 'Dishes',
      type: "array",
      validation: Rule => Rule.required(),
      of: [{type: "reference", to: [{type: "dish"}]}],
      description: "Dishes in this restaurant?"
    }),
  ],

})


//only "to" is for many to one and
// "of" + then type,to in array means one to many.

/*defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }), */