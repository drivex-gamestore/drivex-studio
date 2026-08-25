// Environment variables for Sanity Studio
// Used by GitHub Actions deployment and local dev

export const env = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
}

if (!env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}