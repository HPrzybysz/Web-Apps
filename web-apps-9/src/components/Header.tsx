import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => (
    <header className="header">
        <h1 className="header-title">My Blog</h1>
        <nav className="header-nav">
            <Link to="/">Home</Link>
            <Link to="/categories">Categories</Link>
        </nav>
    </header>
);

export default Header;
