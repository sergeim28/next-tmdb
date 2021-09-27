import React from "react";
import Link from "next/link";
import { MdMovieFilter } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

interface Props {
  toggleTheme: () => void;
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
  return (
    <div className="container">
      <nav>
        <Link href="/">
          <a className="nav-brands">
            <MdMovieFilter className="logo" />
            <div className="text">Discover</div>
          </a>
        </Link>
        <div className="nav-items">
          <Link href="/?sortOrder=asc">
            <a className="nav-item">Ascending</a>
          </Link>
          <Link href="/?sortOrder=desc">
            <a className="nav-item">Descending</a>
          </Link>
        </div>
        <div className="nav-theme">
          <button onClick={() => toggleTheme()}>
            <FaMoon size="1.6rem" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
