// index.tsx
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ArticlesShow from "./pages/ArticlesShow";
import ArticleNew from "./pages/ArticlesNew";
import App from './App.tsx'
import ArticlesPage from "./pages/ArticlesPage";
import ArticlesEdit from "./pages/ArticlesEdit";
import "./index.css"
import CommentForm from "./components/CommentForm";
import LogoutButton from "./components/LogoutButtom";
import HomeButton from "./components/HomeButton";

const root = document.getElementById("root");

if (!root) throw new Error("No root element found");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ArticlesPage />} />
        <Route path="articles/new" element={<ArticleNew />} />
        <Route path="articles/:id" element={<ArticlesShow />} />
        <Route path="articles/:id/edit" element={<ArticlesEdit />} />
        <Route path="/comments/" element={<CommentForm onSubmit={async () => {}} />} />
      </Route>
    </Routes>

        <HomeButton />
    <LogoutButton />
  </BrowserRouter>
);
