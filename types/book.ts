export interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string; // ISO string
  rating: number;
  featured?: boolean;
}
