
import type { FC } from "react";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => (
  <nav className="navbar">
    <div className="navbar-left">
      <h1 className="logo">Links Vault</h1>
      <div className="nav-buttons">
        <button>Home</button>
        <button>Gallery</button>
        <button>Events</button>
        <button>Feedback</button>
        <button>Contact Us</button>
      </div>
    </div>

    <div className="search-box">
      <input
        type="text"
        placeholder="Search links..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span className="search-icon">🔍</span>
    </div>
  </nav>
);

export default Navbar;
