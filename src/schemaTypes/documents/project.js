export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    },
    { name: "image", title: "Thumbnail image", type: "customImage" },
    { name: "mainImage", title: "Main image / media", type: "media" },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    },
    {
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        { name: "mobileImage", title: "Mobile image", type: "customImage" },
        { name: "headline", title: "Headline", type: "string" },
        { name: "headlineLevel", title: "Headline level", type: "string" },
        { name: "headlineDisplay", title: "Headline display", type: "string" },
        { name: "subtext", title: "Subtext", type: "text" },
        {
          name: "ctas",
          title: "CTAs",
          type: "object",
          fields: [
            { name: "layout", title: "Layout", type: "string" },
            { name: "gap", title: "Gap", type: "string" },
            { name: "buttons", title: "Buttons", type: "array", of: [{ type: "ctaButton" }] },
          ],
        },
        { name: "scrollText", title: "Scroll text", type: "string" },
        { name: "useWatermark", title: "Use watermark", type: "boolean" },
      ],
    },
    {
      name: "pageBuilder",
      title: "Sections",
      description: "Drag to reorder. Toggle Enabled to show/hide without deleting.",
      type: "array",
      of: [
        {
          type: "object",
          name: "pageBuilderItem",
          title: "Section",
          fields: [
            {
              name: "sectionType",
              title: "Section type",
              type: "string",
              options: {
                list: [
                  { title: "Content block", value: "contentBlockSection" },
                  { title: "Accordion", value: "accordionSection" },
                  { title: "Media section", value: "mediaSection" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "contentBlockRef",
              title: "Content block instance",
              type: "reference",
              to: [{ type: "contentBlockSection" }],
              hidden: ({ parent }) => parent?.sectionType !== "contentBlockSection",
            },
            { name: "enabled", title: "Enabled", type: "boolean", initialValue: true },
          ],
          preview: {
            select: { sectionType: "sectionType", enabled: "enabled" },
            prepare({ sectionType, enabled }) {
              return { title: sectionType || "Untitled section", subtitle: enabled === false ? "Hidden" : "Visible" };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", media: "image" },
  },
};
