import MainLayout from './layouts/MainLayout';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/LoginForm';
import Register from './pages/Register';
import TopicsMain from './pages/TopicsMain';
import ThreadList from "./pages/ThreadList";
import Posts from './pages/Posts';

function App() {
  return (
    <div className="App">
      <Router>      
        <MainLayout>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Topics_Title/:topicName" element={<ThreadList />} />
            <Route path="/TopicsMain" element={<TopicsMain/>}/>           
            <Route path="/Posts" element={<Posts/>} />                  
          </Routes>                    
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
