export interface Category {
  id?: string;
  name: string;
  description?: string;
  image?: {
    id: string;
    imageUrl: string;
  } | File;
}
