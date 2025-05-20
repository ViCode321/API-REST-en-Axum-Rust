// ArticleForm.tsx
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  initialValues?: {
    title?: string;
    content?: string;
    status?: string;
  };
  onSubmit: (data: any) => Promise<void>;
}

const ArticleForm = ({ initialValues = {}, onSubmit }: Props) => {
  const [title, setTitle] = useState(initialValues.title || "");
  const [content, setBody] = useState(initialValues.content || "");
  const [status, setStatus] = useState(initialValues.status || 'public');

  const navigate = useNavigate();
``
  useEffect(() => {
    if (!title) setTitle(initialValues.title || "");
    if (!content) setBody(initialValues.content || "");
    if (!status) setStatus(initialValues.status || 'public');
  }, [initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, content, status });
    navigate("/");
  };

  return (
    <Form className="mt-5" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control value={title} onChange={e => setTitle(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" value={content} onChange={e => setBody(e.target.value)} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="archived">Archived</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex gap-4">
        <Button type="submit">Submit</Button>
        <Button variant="secondary" onClick={() => navigate("/")}>Return</Button>
      </div>
    </Form>
  );
};

export default ArticleForm;
