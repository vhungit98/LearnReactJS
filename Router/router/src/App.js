import HomePage from "./page/Home";
import NewsPage from "./page/News";
import ContactPage from "./page/Contact";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div style={{ padding: 30 }}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
