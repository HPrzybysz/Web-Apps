import React from "react";
import {Routes, Route, Link} from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetails from './pages/PostDetails';

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="header">
                <h1>Blog</h1>
                <nav>
                    <Link to="/">Home</Link>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<PostList/>}/>
                    <Route path="/post/:id" element={<PostDetails/>}/>
                </Routes>
            </main>
        </div>
    )
}

export default App;

