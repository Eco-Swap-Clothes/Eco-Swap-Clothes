

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext.jsx'; 

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';


import HomePage from './pages/HomePage/HomePage.jsx';
import ExplorePage from './pages/ExplorePage/ExplorePage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import PublishPage from './pages/PublishPage/PublishPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';


const PrivateRoute = ({ children }) => {
   
    const { token } = React.useContext(AuthContext); 
  
    return token ? children : <Navigate to="/login" replace />;
};

function App() {
    return (
      
        <div className="App min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
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