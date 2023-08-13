import MainLayout from './layouts/MainLayout';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/LoginForm';
import Register from './pages/Register';
import TopicsMain from './pages/TopicsMain';
import ThreadList from "./pages/ThreadList";
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import NavBar from './layouts/Navbar';
import ThreadDetail from './pages/ThreadDetail'; // Import the new component
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <MainLayout>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/TopicsMain" element={<TopicsMain />} />
            <Route path="/Topics_Title/:topicId" element={<ThreadList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/threads/:threadId" element={<ThreadDetail />} /> {/* New Route */}
            <Route path="/ForgotPassword" element={<ForgotPassword/>}/>                
          </Routes>                    
        </MainLayout>
      </Router>
    </div>
  );
}
export default App;
