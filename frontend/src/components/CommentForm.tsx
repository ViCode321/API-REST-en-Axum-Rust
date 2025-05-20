import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
  initialValues?: {
    content?: string;
  };
  onSubmit: (data: any) => Promise<void>;
}

const CommentForm = ({ initialValues = {}, onSubmit }: Props) => {
  const [content, setContent] = useState(initialValues.content || "");

  const navigate = useNavigate();

  useEffect(() => {
    setContent(initialValues.content || "");
  }, [initialValues.content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ content });
  };

  return (
    <Form className="mt-5" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </Form.Group>

      <div className="d-flex gap-4">
        <Button type="submit">Save Comment</Button>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Return
        </Button>
      </div>
    </Form>
  );
};


export default CommentForm;