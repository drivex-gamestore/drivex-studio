import { groq } from 'next-sanity'


const heroImageProjection = `{
  "_id": asset->_id,
  "_rev": asset->_rev,
  altText,
  description,
  crop,
  hotspot,
  "dimensions": asset->metadata.dimensions,
  "lqip": asset->metadata.lqip,
  "title": asset->originalFilename
}`

export const heroSectionQuery = groq`
  *[_type == "heroSection" && id == $id][0]{
    id,
    _type,
    "data-theme": dataTheme,
    "data-page-builder-section": _type,
    "data-selector": dataSelector,
    className,
    children[]{
      media{
        aspectRatio,
        externalVideoUrl,
        highResolution,
        type,
        "image": image${heroImageProjection},
        video,
        videoOptions
      },
      "mobileImage": mobileImage${heroImageProjection},
      headline,
      headlineLevel,
      headlineDisplay,
      subtext,
      ctas[]{
        label,
        href,
        variant,
        openInNewTab
      },
      scrollText,
      useWatermark
    }
  }
`



export const heroSectionIdsByPageQuery = groq`
  *[_type == "heroSection" && references($pageId)]{
    id
  }
`
