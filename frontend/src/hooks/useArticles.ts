import { useEffect, useState } from 'react';
import { getArticles } from '../apis/articles';
import type { Article } from '../types/article';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then(data => setArticles(data))
      .finally(() => setLoading(false));
  }, []);

  return { articles, loading };
};
