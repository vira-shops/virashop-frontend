export interface ProductGalleryImage {
  id?: string;
  src: string;
  alt?: string;
}

export interface ProductGalleryProps {
  images: ProductGalleryImage[];
  /**
   * Thumbnail slots in the desktop strip. Past this the last slot becomes a
   * «•••» tile that expands the strip. @default 4
   */
  maxThumbnails?: number;
  className?: string;
}
