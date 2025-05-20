import { useNavigate } from "react-router-dom";
import { FiHome } from "react-icons/fi";

const HomeButton = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/");
    };

    return (
        <button
            onClick={handleHome}
            className="home-button"
            title="Home"
        >
            <FiHome />
        </button>
    );
};

export default HomeButton;
