import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

const HEADLINE_TAGS = { h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6' }

const HEADLINE_DISPLAY_STYLES = {
  'display-xl': 'text-5xl font-semibold tracking-tight sm:text-7xl',
  h1: 'text-4xl font-semibold tracking-tight sm:text-5xl',
  h2: 'text-3xl font-semibold tracking-tight sm:text-4xl',
  h3: 'text-2xl font-semibold tracking-tight sm:text-3xl',
}

const CTA_STYLES = {
  primary:
    'inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90',
  secondary:
    'inline-flex items-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium transition hover:border-foreground/40',
  ghost:
    'inline-flex items-center px-2 py-3 text-sm font-medium underline underline-offset-4 transition hover:opacity-70',
}

function HeroBackground({ image, mobileImage }) {
  if (!image?._id) return null

  return (
    <picture className="absolute inset-0 -z-10">
      {mobileImage?._id && (
        <source
          media="(max-width: 767px)"
          srcSet={urlFor(mobileImage).width(800).auto('format').url()}
        />
      )}
      <Image
        src={urlFor(image).width(2400).auto('format').url()}
        alt={image.altText || ''}
        placeholder={image.lqip ? 'blur' : undefined}
        blurDataURL={image.lqip}
        width={image.dimensions?.width || 2400}
        height={image.dimensions?.height || 1600}
        priority
        className="h-full w-full object-cover"
      />
    </picture>
  )
}

function HeroCtas({ ctas }) {
  if (!ctas?.length) return null

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      {ctas.map((item, i) => (
        <a
          key={item.href ? `${item.href}-${i}` : i}
          href={item.href}
          target={item.openInNewTab ? '_blank' : undefined}
          rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
          className={CTA_STYLES[item.variant] || CTA_STYLES.primary}
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}

export default function HeroSection({ data }) {
  if (!data) return null

  const {
    id,
    'data-theme': dataTheme,
    'data-page-builder-section': dataPageBuilderSection,
    'data-selector': dataSelector,
    className,
    children,
  } = data

  const block = children?.[0]
  if (!block) return null

  const {
    media,
    mobileImage,
    headline,
    headlineLevel = 'h1',
    headlineDisplay = 'display-xl',
    subtext,
    ctas,
    scrollText,
    useWatermark,
  } = block

  const HeadlineTag = HEADLINE_TAGS[headlineLevel] || 'h1'
  const headlineLines = (headline || '').split('\\n')

  return (
    <section
      id={id}
      data-theme={dataTheme}
      data-page-builder-section={dataPageBuilderSection}
      data-selector={dataSelector}
      className={className}
    >
      {useWatermark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"
        />
      )}

      <div className="relative">
        {media?.type !== 'video' && (
          <HeroBackground image={media?.image} mobileImage={mobileImage} />
        )}

        {media?.type === 'video' && (media?.video?.asset?.url || media?.externalVideoUrl) && (
          <video
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            src={media.video?.asset?.url || media.externalVideoUrl}
            autoPlay={media.videoOptions?.autoplay ?? true}
            loop={media.videoOptions?.loop ?? true}
            muted={media.videoOptions?.muted ?? true}
            playsInline
          />
        )}

        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <HeadlineTag className={HEADLINE_DISPLAY_STYLES[headlineDisplay] || HEADLINE_DISPLAY_STYLES['display-xl']}>
            {headlineLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </HeadlineTag>

          {subtext && <p className="mx-auto mt-6 max-w-xl text-lg text-foreground/70">{subtext}</p>}

          <HeroCtas ctas={ctas} />

          {scrollText && (
            <p className="mt-14 text-xs uppercase tracking-widest text-foreground/50">{scrollText}</p>
          )}
        </div>
      </div>
    </section>
  )
}
