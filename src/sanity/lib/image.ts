import {createImageUrlBuilder} from "@sanity/image-url";
import {sanityDataset, sanityProjectId} from "./client";

const builder = createImageUrlBuilder({projectId: sanityProjectId, dataset: sanityDataset});

export function urlForImage(source: unknown) {
  return builder.image(source as Parameters<typeof builder.image>[0]);
}
