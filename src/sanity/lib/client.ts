import {createClient} from 'next-sanity'

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5vojr174'
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: '2026-02-01',
  // Fresh reads make local Studio edits visible immediately. We can switch to
  // webhook/tag revalidation for production once the site is deployed.
  useCdn: false,
})

export const sanityWriteClient = sanityClient.withConfig({
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})
