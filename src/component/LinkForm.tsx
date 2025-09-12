import React, { useState, FC } from "react";
import type { Link } from "./Link";

interface LinkFormProps {
  onSave: (link: Link) => void;
  onCancel: () => void;
  initialLink?: Link;
}

export const LinkForm: FC<LinkFormProps> = ({
  onSave,
  onCancel,
  initialLink,
}) => {
  const [title, setTitle] = useState(initialLink?.title || "");
  const [url, setUrl] = useState(initialLink?.url || "");
  const [description, setDescription] = useState(
    initialLink?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: initialLink?.id, // preserve id if editing
      title,
      url,
      description,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="link-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
