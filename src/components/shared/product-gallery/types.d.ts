export interface ProductGalleryImage {
  id?: string;
  src: string;
  alt?: string;
}

export interface ProductGalleryProps {
  images: ProductGalleryImage[];
  className?: string;
}
