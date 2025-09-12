import React, { FC, useState, FormEvent } from "react";
import type { Link } from "./Link";

interface LinkFormProps {
  initialLink?: Link | null;
  onSave: (link: Link) => void;
  onCancel: () => void;
}

export const LinkForm: FC<LinkFormProps> = ({
  initialLink,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialLink?.title || "");
  const [url, setUrl] = useState(initialLink?.url || "");
  const [description, setDescription] = useState(
    initialLink?.description || ""
  );
  const [isUrlInvalid, setIsUrlInvalid] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setIsUrlInvalid(true);
      return;
    }
    onSave({ ...initialLink, title, url, description });
    setTitle("");
    setUrl("");
    setDescription("");
    setIsUrlInvalid(false);
  };

  return (
    <div className="form-container">
      <h2>{initialLink ? "Edit Link" : "Add New Link"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          URL
          <input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setIsUrlInvalid(false);
            }}
            required
          />
          {isUrlInvalid && (
            <p className="error">Please enter a valid URL (https://...)</p>
          )}
        </label>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="btn-save">
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
