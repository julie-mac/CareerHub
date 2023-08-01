import MainLayout from './layouts/MainLayout';
import React from 'react';
import { HashRouter} from 'react-router-dom'
import './App.css';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <HashRouter >

    <MainLayout>
    <div className="App">
      <LoginForm />
    </div>
    </MainLayout>
    </HashRouter>
  );
}

export default App;
