import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Article } from "../types/article";
import ArticleForm from "../components/ArticleForm";
import { getArticle, updateArticle } from "../apis/articles";

const ArticlesEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      getArticle(String(id)).then(setArticle);
    }
  }, [id]);

  const handleUpdate = async (data: Partial<Article>) => {
    if (id) {
      await updateArticle(String(id), data);
      navigate(`/articles/${id}`);
    }
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h1>Edit Article</h1>
      <ArticleForm initialValues={article} onSubmit={handleUpdate} />
    </div>  
  );
};

export default ArticlesEdit;
