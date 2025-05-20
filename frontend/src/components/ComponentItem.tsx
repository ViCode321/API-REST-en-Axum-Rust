import { deleteComment } from "../apis/comments";
import type { Comment } from "../types/comment";
import { Button } from "react-bootstrap";

interface Props {
  comment: Comment;
  articleId: string;
  onDelete: (id: string) => void;
}

const CommentItem = ({ comment, onDelete }: Props) => {
  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      onDelete(comment.id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <h5 className="form-label">Comment:</h5>
        <p className="form-control">{comment.content}</p>
      </div>

      <div>
        <Button variant="danger" onClick={handleDelete}>
          Delete Comment
        </Button>
      </div>
    </div>
  );
};

export default CommentItem;
