import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertyDetails from './pages/PropertyDetails';
import Featured from './pages/Featured';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Agents from './pages/Agents';
import Legal from './pages/Legal';
import Help from './pages/Help';
import FAQ from './pages/FAQ';

const App: React.FC = () => {
  // Favorites State Logic
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('lumina_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('lumina_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id) 
        : [...prev, id]
    );
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar favoritesCount={favorites.length} />
        
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />} 
            />
            <Route 
              path="/featured" 
              element={<Featured favorites={favorites} toggleFavorite={toggleFavorite} />} 
            />
            <Route 
              path="/services" 
              element={<Services />} 
            />
            <Route 
              path="/contact" 
              element={<Contact />} 
            />
            <Route 
              path="/about" 
              element={<About />} 
            />
            <Route 
              path="/agents" 
              element={<Agents />} 
            />
            <Route 
              path="/legal" 
              element={<Legal />} 
            />
            <Route 
              path="/help" 
              element={<Help />} 
            />
            <Route 
              path="/faq" 
              element={<FAQ />} 
            />
            <Route 
              path="/property/:id" 
              element={<PropertyDetails favorites={favorites} toggleFavorite={toggleFavorite} />} 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;