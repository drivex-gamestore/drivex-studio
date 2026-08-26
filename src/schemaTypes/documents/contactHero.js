import { asciiArtFields } from "../objects/asciiArtFields";

export default {
  name: "contact-hero",
  title: "Contact Hero",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "ascii", title: "ASCII art" },
  ],
  fields: [
    {
      name: "content",
      title: "Content",
      type: "object",
      group: "content",
      fields: [
        { name: "headline", title: "Headline", type: "string" },
        { name: "headlineLevel", title: "Headline level", type: "string" },
        { name: "headlineDisplay", title: "Headline display", type: "string" },
      ],
    },
    {
      name: "contactInformation",
      title: "Contact information",
      description: "Primary contact email.",
      type: "contact",
      group: "content",
    },
    {
      name: "team",
      title: "Team contacts",
      description: "Individual team member emails shown alongside the primary contact.",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "teamContact",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "email", title: "Email", type: "string" },
          ],
        },
      ],
    },
    {
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "content",
      of: [{ type: "link" }],
    },
    {
      name: "availability",
      title: "Availability",
      type: "availability",
      group: "content",
    },
    {
      name: "bookCallCta",
      title: "Book a call CTA",
      type: "ctaButton",
      group: "content",
    },
    {
      name: "bookCallHeading",
      title: "Book a call heading",
      description: "e.g. \"Book a 15-minute intro call. Pick a time that works.\"",
      type: "string",
      group: "content",
    },
    {
      name: "formHeading",
      title: "Form heading",
      description: "e.g. \"Send a message\"",
      type: "string",
      group: "content",
    },
    ...asciiArtFields("").map((f) => ({ ...f, group: "ascii" })),
  ],
  preview: {
    prepare() {
      return { title: "Contact Hero" };
    },
  },
};
