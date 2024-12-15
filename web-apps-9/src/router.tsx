import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import CategoriesPage from './pages/CategoriesPage';

export const RouterProvider: React.FC = () => (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
    </Routes>
);
