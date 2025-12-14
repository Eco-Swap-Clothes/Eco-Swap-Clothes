

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx'; 

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';


import HomePage from './pages/HomePage.jsx';
import ExplorePage from './pages/ExplorePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PublishPage from './pages/PublishPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';


const PrivateRoute = ({ children }) => {
   
    const { token } = React.useContext(AuthContext); 
  
    return token ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
      
        <div className="App" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flexGrow: 1, padding: '20px' }}>
                <Routes>
               
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    
                    <Route 
                        path="/publish" 
                        element={<PrivateRoute><PublishPage /></PrivateRoute>} 
                    />
                    <Route 
                        path="/profile" 
                        element={<PrivateRoute><ProfilePage /></PrivateRoute>} 
                    />
                    

                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;