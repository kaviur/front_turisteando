export interface ReqCategory {
    id?: string;
    name: string;
    description?: string;
    image?: {
      id: string;
      imageUrl: string;
    } | File;
}

export interface ResCategory {
    id: string;
    name: string;
    description: string;
    image: {
      id: string;
      imageUrl: string;
    };
}