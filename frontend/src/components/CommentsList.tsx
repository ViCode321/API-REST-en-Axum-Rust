import type { Comment } from "../types/comment";
import CommentItem from "./ComponentItem";

interface Props {
  comments: Comment[];
  articleId: string;
  onDelete: (id: string) => void;
}

const CommentsList = ({ comments, articleId, onDelete }: Props) => {
  return (
    <>
      {comments.map(comment => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          articleId={articleId} 
          onDelete={onDelete} 
        />
      ))}
    </>
  );
};

export default CommentsList;
