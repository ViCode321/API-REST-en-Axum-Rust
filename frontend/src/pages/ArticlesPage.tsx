// ArticlesPage.tsx
import React, { useEffect, useState } from 'react';
import { Container, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login';
import { getArticles } from '../apis/articles';
import type { Article } from '../types/article';
import ArticleNewBottom from "../components/ArticleNewBottom";


const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setShowLogin(true);
      setLoading(false);
      return;
    }

    try {
      const res = await getArticles();
      setArticles(res);
    } catch (err: any) {
      setError('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    fetchArticles();
  };

  const publicCount = articles.filter(article => article.status === 'public').length;

  if (loading)
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
          <Spinner animation="border" />
        </div>
    );

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
      <Container className="mt-5">
        <h1 className="display-4">Articles</h1>
        <p className="text">Our blog has {publicCount} articles and counting!</p>

        <ListGroup>
          {articles
              .filter(article => article.status !== 'private')
              .map(article => (
                  <ListGroup.Item
                      key={article.id}
                      action
                      onClick={() => navigate(`/articles/${article.id}`)}
                  >
                    {article.title}
                  </ListGroup.Item>
              ))}
        </ListGroup>

        <ArticleNewBottom/>

        <Login
            show={showLogin}
            onClose={() => setShowLogin(false)}
            onLoginSuccess={handleLoginSuccess}
        />
      </Container>
  );
};

export default ArticlesPage;
