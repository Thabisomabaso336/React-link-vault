import React, { FC } from "react";
import type { Link } from "./Link";

interface LinkCardProps {
  link: Link;
  onEdit: () => void;
  onDelete: () => void;
}

export const LinkCard: FC<LinkCardProps> = ({ link, onEdit, onDelete }) => (
  <div className="link-card">
    <div className="link-info">
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.title}
      </a>
      <p>{link.description}</p>
      <span>{link.url}</span>
    </div>
    <div className="link-actions">
      <button onClick={onEdit}>Edit</button>
      <button className="delete" onClick={onDelete}>
        Delete
      </button>
    </div>
  </div>
);
