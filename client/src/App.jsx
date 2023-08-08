import MainLayout from './layouts/MainLayout';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/LoginForm';
import Register from './pages/Register';
import TopicsMain from './pages/TopicsMain';
import Posts from './pages/Posts';
import Technology from './pages/Topics_Title/Technology';
import Science from './pages/Topics_Title/Science';
import Law from './pages/Topics_Title/Law';
import Economics from './pages/Topics_Title/Economics';
import Art from './pages/Topics_Title/Art';
import Education from './pages/Topics_Title/Education';
import Health from './pages/Topics_Title/Health';
import Medicine from './pages/Topics_Title/Medicine';
import Culinary_Arts from './pages/Topics_Title/Culinary_Arts';
import Fashion from './pages/Topics_Title/Fashion';
import Finance from './pages/Topics_Title/Finance';
import Automotive from './pages/Topics_Title/Automotive';
import Travel from './pages/Topics_Title/Travel';
import Government from './pages/Topics_Title/Government';


function App() {
  return (
    <div className="App">
      <Router>      
        <MainLayout>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/TopicsMain" element={<TopicsMain/>}/>            
            <Route path="/Posts" element={<Posts/>} />   
            <Route path="/Topics_Title/Technology" element={<Technology/>} /> 
            <Route path="/Topics_Title/Science" element={<Science/>} />   
            <Route path="/Topics_Title/Law" element={<Law/>} />
            <Route path="/Topics_Title/Economics" element={<Economics/>} />  
            <Route path="/Topics_Title/Art" element={<Art/>} /> 
            <Route path="/Topics_Title/Education" element={<Education/>} />
            <Route path="/Topics_Title/Health" element={<Health/>} />
            <Route path="/Topics_Title/Medicine" element={<Medicine/>} />
            <Route path="/Topics_Title/Culinary_Arts" element={<Culinary_Arts/>} />
            <Route path="/Topics_Title/Fashion" element={<Fashion/>} />
            <Route path="/Topics_Title/Finance" element={<Finance/>} />
            <Route path="/Topics_Title/Automotive" element={<Automotive/>} />  
            <Route path="/Topics_Title/Travel" element={<Travel/>} />  
            <Route path="/Topics_Title/Government" element={<Government/>} />               
          </Routes>                    
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;