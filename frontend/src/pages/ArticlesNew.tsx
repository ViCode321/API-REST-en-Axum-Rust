import ArticleForm from "../components/ArticleForm";
import { createArticle } from "../apis/articles";
const ArticleNew = () => {

  return (
    <div className="container mt-5">
      <h1>New Article</h1>
      <ArticleForm onSubmit={createArticle} />
    </div>
  );
};

export default ArticleNew;
