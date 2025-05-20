import type { Comment } from '../types/comment';

const API_URL = 'http://localhost:3000/api/comments';

export const getComment = async (id: string): Promise<Comment> => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createComment = async (articleId: string, data: { content: string }) => {
  const res = await fetch(`${API_URL}/${articleId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, article_id: articleId }),
  });

  if (!res.ok) throw new Error("Failed to create comment");

  return res.json();
};

export const updateComment = async (id: string, data: { content: string, article_id: number }) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};


export const deleteComment = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
 