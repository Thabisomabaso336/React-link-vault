import React, { FC } from "react";
import type { Link } from "./Link";

interface LinkCardProps {
  link: Link;
  onEdit: () => void;
  onDelete: () => void;
}

export const LinkCard: FC<LinkCardProps> = ({ link, onEdit, onDelete }) => (
  <div className="link-card">
    <h3>{link.title}</h3>
    <p>{link.description}</p>
    <a href={link.url} target="_blank" rel="noopener noreferrer">
      {link.url}
    </a>
    <div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  </div>
);
