import React from "react";


interface FormProps {
  onSubmit: (link: {
    title: string;
    url: string;
    description?: string;
  }) => void;
  onCancel: () => void;
}
const Form: React.FC<FormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !url) {
      setError("Title and URL are required.");
      return;
    }
    setError("");
    onSubmit({ title, url, description });
  };
  return (
    <form className="simple-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add Link</h2>
      {error && <p className="form-error">{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="form-input"
        required
      />
      <input
        type="url"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="form-input"
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-textarea"
      />
      <div className="form-actions">
        <button type="submit" className="btn btn-save">
          Save
        </button>
        <button type="button" onClick={onCancel} className="btn btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  );
};
export default Form;