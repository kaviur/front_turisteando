export interface Characteristics {
  id?: string;
  name: string;
  image?: {
    id: string;
    imageUrl: string;
  } | File;
}
