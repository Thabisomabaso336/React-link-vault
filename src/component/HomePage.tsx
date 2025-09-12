import React, { FC } from "react";
import { LinkCard } from "./LinkCard";
import { LinkForm } from "./LinkForm";
import type { Link } from "./Link";

interface HomePageProps {
  userId: string | null;
  isEditing: boolean;
  currentLink: Link | null;
  filteredLinks: Link[];
  setIsEditing: (editing: boolean) => void;
  setCurrentLink: (link: Link | null) => void;
  handleSave: (link: Link) => void;
  handleCancel: () => void;
  handleEdit: (link: Link) => void;
  deleteLink: (id: string) => void;
}

export const HomePage: FC<HomePageProps> = ({
  userId,
  isEditing,
  currentLink,
  filteredLinks,
  setIsEditing,
  setCurrentLink,
  handleSave,
  handleCancel,
  handleEdit,
  deleteLink,
}) => (
  <div className="main">
    {userId && <p className="user-id">User ID: {userId}</p>}
    <button
      className="btn-add"
      onClick={() => {
        setIsEditing(true);
        setCurrentLink(null);
      }}
    >
      Add New Link
    </button>

    {isEditing && (
      <LinkForm
        initialLink={currentLink}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    )}

    {filteredLinks.length === 0 && <p>No links found. Add one!</p>}

    <div className="link-list">
      {filteredLinks.map((link) =>
        link.id ? (
          <LinkCard
            key={link.id}
            link={link}
            onEdit={() => handleEdit(link)}
            onDelete={() => deleteLink(link.id!)}
          />
        ) : null
      )}
    </div>
  </div>
);

export default HomePage;
