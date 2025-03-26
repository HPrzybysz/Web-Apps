import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import PostList from './pages/PostList';
import PostDetails from './pages/PostDetails';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/posts" element={<PostList />} />
                    <Route path="/post/:id" element={<PostDetails />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;