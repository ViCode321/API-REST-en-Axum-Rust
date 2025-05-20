import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ArticleNewBottom = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    if (!token) return null;

    return (
        <Button className="mt-4" onClick={() => navigate('/articles/new')}>
            New Article
        </Button>
    );
};

export default ArticleNewBottom;
