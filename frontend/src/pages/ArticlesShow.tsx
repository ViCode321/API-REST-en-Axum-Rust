import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import type { Article } from "../types/article";
import { getArticle, deleteArticle } from "../apis/articles";
import CommentsList from "../components/CommentsList";
import CommentForm from "../components/CommentForm";
import { createComment } from "../apis/comments";

const ArticlesShow = () => {
  const { id } = useParams();

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      getArticle(String(id)).then(data =>
        setArticle({ ...data, comments: data.comments ?? [] })
      );
    }
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      await deleteArticle(String(id));
      window.location.href = "/";
    }
  };

  if (!article) return null;

  const handleCreateComment = async (data: { content: string }) => {
    await createComment(article.id, data);
    const updated = await getArticle(article.id);
    setArticle({ ...updated, comments: updated.comments ?? [] });
  };

  const handleDeleteComment = (deletedId: string) => {
    if (!article) return;
    setArticle({
      ...article,
      comments: article.comments.filter(comment => comment.id !== deletedId),
    });
  };

  return (
    <Container className="mt-4">
      <h1>{article.title}</h1>
      <p>{article.content}</p>

      <div className="mb-3">
        <Link to={`/articles/${article.id}/edit`}>
          <Button variant="warning" className="me-2">
            Edit
          </Button>
        </Link>

        <Button variant="danger" onClick={handleDelete}>
          Destroy
        </Button>
      </div>

      <hr />

      <div className="mt-5">
        {article.comments!.length > 0 ? (
          <>
            <h2 className="mb-4">Comments</h2>
            <CommentsList
              comments={article.comments}
              articleId={article.id}
              onDelete={handleDeleteComment}
            />
          </>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}

        <div className="mt-5">
          <h3>Add a comment:</h3>
          <CommentForm onSubmit={handleCreateComment} />
        </div>
      </div>
    </Container>
  );
};

export default ArticlesShow;
