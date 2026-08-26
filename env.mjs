// Environment variables for Sanity Studio
// Used by GitHub Actions deployment and local dev
// Vite (Sanity Studio's build tool) only exposes vars prefixed with SANITY_STUDIO_
// via import.meta.env — process.env.NEXT_PUBLIC_* (Next.js convention) does not work here.

export const env = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: import.meta.env.SANITY_STUDIO_PROJECT_ID || '',
  NEXT_PUBLIC_SANITY_DATASET: import.meta.env.SANITY_STUDIO_DATASET || 'production',
}

if (!env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID environment variable')
}
