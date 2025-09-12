import React, { FC } from "react";
import { LinkCard } from "./LinkCard";
import { LinkForm } from "./LinkForm";
import type { Link } from "./Link";

interface HomePageProps {
  userId: string | null;
  isEditing: boolean;
  currentLink: Link | null;
  isLoading?: boolean;
  filteredLinks: Link[];
  setIsEditing: (isEditing: boolean) => void;
  setCurrentLink: (link: Link | null) => void;
  handleSave: (link: Link) => void;
  handleCancel: () => void;
  handleEdit: (link: Link) => void;
  deleteLink: (id: string) => void;
}

const HomePage: FC<HomePageProps> = ({
  userId,
  isEditing,
  currentLink,
  isLoading,
  filteredLinks,
  setIsEditing,
  setCurrentLink,
  handleSave,
  handleCancel,
  handleEdit,
  deleteLink,
}) => (
  <div className="homepage">
    {userId && <p>Welcome, {userId}</p>}

    <button
      onClick={() => {
        setIsEditing(true);
        setCurrentLink(null);
      }}
    >
      ➕ Add New Link
    </button>

    {isEditing && (
      <LinkForm
        onSave={handleSave}
        onCancel={handleCancel}
        initialLink={currentLink || undefined}
      />
    )}

    {isLoading && <p>Loading links...</p>}

    {!isLoading && filteredLinks.length === 0 && <p>No links yet. Add one!</p>}

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
