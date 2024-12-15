import React from 'react';
import { RouterProvider } from './router';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <Header />
            <main>
                <RouterProvider />
            </main>
            <Footer />
        </div>
    );
};

export default App;
