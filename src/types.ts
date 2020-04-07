export type Film = {
  title: string;
  posterImage: string;
  previewImage: string;
  backgroundImage: string;
  backgroundColor: string;
  description: string;
  ratingScore: number;
  ratingCount: number;
  director: string;
  starring: string[];
  runTime: string;
  genre: string;
  releaseDate: number;
  id: number | string;
  isFavorite: boolean;
  videoLink: string;
  previewSrc: string;
};

export type Comment = {
  id: string;
  user: {
    id: number;
    name: string;
  }
  rating: number;
  text: string;
  date: object;
};
