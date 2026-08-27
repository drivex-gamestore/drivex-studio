export default {
  name: "mediaSection",
  title: "Media Section",
  type: "document",
  fields: [
    { name: "theme", title: "Theme", type: "string", options: { list: ["light", "dark"] }, initialValue: "light" },
    { name: "className", title: "Custom class name", type: "string" },
    {
      name: "items",
      title: "Items",
      description: "Drag to reorder. Span/Start control the column position on desktop (12-column grid); mobile is always full width.",
      type: "array",
      of: [
        {
          type: "object",
          name: "mediaItem",
          title: "Media item",
          fields: [
            { name: "media", title: "Media", type: "media" },
            {
              name: "lgSpan",
              title: "Desktop column span (1–12)",
              type: "number",
              initialValue: 10,
              validation: (Rule) => Rule.min(1).max(12),
            },
            {
              name: "lgStart",
              title: "Desktop column start (1–12)",
              type: "number",
              initialValue: 2,
              validation: (Rule) => Rule.min(1).max(12),
            },
          ],
          preview: {
            select: { media: "media.image", span: "lgSpan", start: "lgStart" },
            prepare({ media, span, start }) {
              return { title: `span ${span ?? "–"} / start ${start ?? "–"}`, media };
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: { count: "items.length" },
    prepare({ count }) {
      return { title: "Media Section", subtitle: `${count ?? 0} item(s)` };
    },
  },
};
