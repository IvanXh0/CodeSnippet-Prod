import React from 'react';
import Navbar from './components/Navbar';
import { AuthProvider } from './auth/AuthContext';
import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import './App.css';
import SnippetDetails from './pages/SnippetDetails';
import SnippetPage from './pages/SnippetPage';
import { AnimatePresence } from 'framer-motion';
import NewSnippet from './pages/NewSnippet';

const App = () => {
  const location = useLocation();
  return (
    <AuthProvider>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Homepage />} />
          <Route path="/snippets" element={<SnippetPage />} />
          <Route path="/f/:id" element={<SnippetDetails />} />
          <Route path="f/:id/new" element={<NewSnippet />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
};

export default App;
