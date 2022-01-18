export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  genre: string;
  description: string;
  status: BookStatus;
}

export enum BookStatus {
  UNREAD = 'UNREAD',
  READ = 'READ',
  IN_PROGRESS = 'IN_PROGRESS',
  WISHLIST = 'WISHLIST',
}
