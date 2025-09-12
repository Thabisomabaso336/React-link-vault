import React, { useState, useEffect } from "react";
import Navbar from "./component/navBar";
import HomePage from "./component/HomePage";
import Footer from "./component/Footer";
import type { LinkForm } from "./component/LinkForm";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [links, setLinks] = useState<LinkForm[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLink, setCurrentLink] = useState<LinkForm | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Load from localStorage on startup
  useEffect(() => {
    const storedLinks = localStorage.getItem("links");
    if (storedLinks) {
      setLinks(JSON.parse(storedLinks));
    }
  }, []);

  // Save to localStorage when links change
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

  const handleSave = (link: Link) => {
    if (!link.id) {
      link.id = Date.now().toString();
    }

    setLinks(
      (prev) =>
        prev.some((l) => l.id === link.id)
          ? prev.map((l) => (l.id === link.id ? link : l)) // update
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
    link.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
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

      <Footer />
    </div>
  );
}
