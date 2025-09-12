import React, { useState, useEffect } from "react";
import Navbar from "./component/navBar";
import HomePage from "./component/HomePage";
import Footer from "./component/Footer";
import type { Link } from "./component/Link";


export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLink, setCurrentLink] = useState<Link | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Load from localStorage on startup
  useEffect(() => {
    const storedLinks = localStorage.getItem("links");
    if (storedLinks) setLinks(JSON.parse(storedLinks));
  }, []);

  // Save to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(links));
  }, [links]);

  // Auto-clear feedback
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  // Save or update a link
  const handleSave = (link: Link) => {
    if (!link.id) link.id = Date.now().toString();

    setLinks(
      (prev) =>
        prev.some((l) => l.id === link.id)
          ? prev.map((l) => (l.id === link.id ? link : l)) // update existing
          : [link, ...prev] // add new
    );

    setFeedback("✅ Link saved successfully!");
    setIsEditing(false);
    setCurrentLink(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentLink(null);
  };

  const handleEdit = (link: Link) => {
    setCurrentLink(link);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
    setFeedback("🗑️ Link deleted successfully!");
  };

  const filteredLinks = links.filter((link) =>
    link.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {feedback && <div className="feedback">{feedback}</div>}

      <HomePage
        userId="user01"
        isEditing={isEditing}
        currentLink={currentLink}
        filteredLinks={filteredLinks}
        setIsEditing={setIsEditing}
        setCurrentLink={setCurrentLink}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleEdit={handleEdit}
        deleteLink={handleDelete}
      />
  <div className="Footer">
    <p>&copy; 2025 <strong>mLab Links Vault</strong>. All rights reserved.</p>
    <div className="footer-contact">
      <p>📞 031 443 8790</p>
      <p>✉️ <a href="mailto:support@linksvault.com">support@linksvault.com</a></p>
    </div>
    <div className="footer-social">
      <span>🌐 Follow us on </span>
      <a href="https://github.com/mLab-Dev" target="_blank" rel="noreferrer"> GitHub: mLab-Dev </a>
    </div>
  </div>

    </div>
  );
}
