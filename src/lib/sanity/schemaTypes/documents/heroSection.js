import { defineField, defineType, defineArrayMember } from 'sanity'

const HEADLINE_LEVELS = [
  { title: 'H1', value: 'h1' },
  { title: 'H2', value: 'h2' },
  { title: 'H3', value: 'h3' },
  { title: 'H4', value: 'h4' },
  { title: 'H5', value: 'h5' },
  { title: 'H6', value: 'h6' },
]

const HEADLINE_DISPLAYS = [
  { title: 'Display XL', value: 'display-xl' },
  { title: 'Heading 1', value: 'h1' },
  { title: 'Heading 2', value: 'h2' },
  { title: 'Heading 3', value: 'h3' },
]

const CTA_VARIANTS = [
  { title: 'Primary', value: 'primary' },
  { title: 'Secondary', value: 'secondary' },
  { title: 'Ghost', value: 'ghost' },
]

const imageFields = [
  defineField({
    name: 'altText',
    title: 'Alt text',
    type: 'string',
    description: 'Describes the image for screen readers and SEO.',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'description',
    title: 'Description',
    type: 'text',
    rows: 2,
    description: 'Internal note about what this image shows (not rendered on the page).',
  }),
]

const cta = defineField({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'href', title: 'Link', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      options: { list: CTA_VARIANTS, layout: 'radio' },
      initialValue: 'primary',
    }),
    defineField({ name: 'openInNewTab', title: 'Open in new tab', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'href' },
  },
})

// A single hero media slot: either an image or a video, plus display options.
const media = defineField({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Media type',
      type: 'string',
      options: { list: ['image', 'video'], layout: 'radio' },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: imageFields,
      hidden: ({ parent }) => parent?.type !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video file',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ parent }) => parent?.type !== 'video',
    }),
    defineField({
      name: 'externalVideoUrl',
      title: 'External video URL',
      type: 'url',
      description: 'Use instead of an uploaded file for YouTube/Vimeo/hosted video.',
      hidden: ({ parent }) => parent?.type !== 'video',
    }),
    defineField({
      name: 'videoOptions',
      title: 'Video options',
      type: 'object',
      hidden: ({ parent }) => parent?.type !== 'video',
      fields: [
        defineField({ name: 'autoplay', title: 'Autoplay', type: 'boolean', initialValue: true }),
        defineField({ name: 'loop', title: 'Loop', type: 'boolean', initialValue: true }),
        defineField({ name: 'muted', title: 'Muted', type: 'boolean', initialValue: true }),
      ],
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect ratio',
      type: 'number',
      description: 'Width / height, e.g. 1.5 for a 3:2 image.',
    }),
    defineField({
      name: 'highResolution',
      title: 'Serve at full resolution',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { media: 'image', title: 'image.altText', type: 'type' },
    prepare({ media: img, title, type }) {
      return { title: title || 'Hero media', subtitle: type, media: img }
    },
  },
})

// One hero content block (an entry in `children`). Kept as an array so a
// hero section can hold more than one slide/variant if needed later.
const heroContent = defineField({
  name: 'heroContent',
  title: 'Hero Content',
  type: 'object',
  fields: [
    media,
    defineField({
      name: 'mobileImage',
      title: 'Mobile image',
      type: 'image',
      options: { hotspot: true },
      fields: imageFields,
      description: 'Optional override shown instead of the main image on small screens.',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 2,
      description: 'Use \\n where you want a manual line break.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headlineLevel',
      title: 'Headline HTML tag',
      type: 'string',
      options: { list: HEADLINE_LEVELS },
      initialValue: 'h1',
    }),
    defineField({
      name: 'headlineDisplay',
      title: 'Headline visual size',
      type: 'string',
      options: { list: HEADLINE_DISPLAYS },
      initialValue: 'display-xl',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctas',
      title: 'Calls to action',
      type: 'array',
      of: [defineArrayMember(cta)],
    }),
    defineField({
      name: 'scrollText',
      title: 'Scroll indicator text',
      type: 'string',
    }),
    defineField({
      name: 'useWatermark',
      title: 'Show watermark overlay',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'headline', subtitle: 'subtext' },
  },
})

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Section ID',
      type: 'string',
      description: 'Stable DOM id / anchor for this section, e.g. "about-hero".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dataTheme',
      title: 'Theme',
      type: 'string',
      options: { list: ['light', 'dark'], layout: 'radio' },
      initialValue: 'dark',
    }),
    defineField({
      name: 'dataSelector',
      title: 'Data selector',
      type: 'string',
      description: 'Used for QA / analytics targeting (rendered as data-selector).',
    }),
    defineField({
      name: 'className',
      title: 'Extra CSS classes',
      type: 'string',
      description: 'Tailwind classes applied to the section wrapper.',
    }),
    defineField({
      name: 'children',
      title: 'Hero content blocks',
      type: 'array',
      of: [defineArrayMember(heroContent)],
      validation: (Rule) => Rule.min(1).max(1),
    }),
  ],
  preview: {
    select: { title: 'id', subtitle: 'children.0.headline' },
    prepare({ title, subtitle }) {
      return { title: title || 'Untitled hero section', subtitle }
    },
  },
})
