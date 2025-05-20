export interface Article {
  id: string;
  title: string;
  content: string;
  status: 'public' | 'private' | 'archived';
  comments: Comment[];
}
