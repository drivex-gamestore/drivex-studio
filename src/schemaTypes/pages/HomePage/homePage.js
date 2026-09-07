export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "pageBuilder",
      title: "Sections",
      description: "From here you can add sections and drag them to reorder.",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "cardsSection" },
        { type: "animatedListSection" },
        { type: "featuredWorkSection" },
        { type: "indexedGridSection" },
        { type: "accordionSection" },
        { 
          type: "reference", 
          name: "contentBlockRef",
          title: "Content Block (Reusable)",
          to: [{ type: "contentBlockSection" }] 
        }
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
};
