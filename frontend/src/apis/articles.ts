import type { Article } from '../types/article';

const API_URL = 'http://localhost:3000/api/articles';

export const getArticles = async (): Promise<Article[]> => {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching articles: ${res.status}`);
  }

  return res.json();
};

export const getArticle = async (id: string): Promise<Article> => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    throw new Error(`Error fetching article ${id}: ${res.status}`);
  }

  return res.json();
};

export const createArticle = async (data: Partial<Article>) => {
  const token = localStorage.getItem("token");

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error creating article: ${res.status}`);
  }

  return res.json();
};

export const updateArticle = async (id: string, data: Partial<Article>) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error updating article ${id}: ${res.status}`);
  }

  return res.json();
};

export const deleteArticle = async (id: string): Promise<void> => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    throw new Error(`Error deleting article ${id}: ${res.status}`);
  }
};
