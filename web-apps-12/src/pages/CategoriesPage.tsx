import React from 'react';
import './CategoriesPage.scss';

const CategoriesPage: React.FC = () => (
    <div className="categories-page">
        <h2>Categories</h2>
        <ul>
            <li>Tech</li>
            <li>Lifestyle</li>
            <li>Travel</li>
        </ul>
    </div>
);

export default CategoriesPage;
