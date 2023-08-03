import MainLayout from './layouts/MainLayout';
import React from 'react';
import { HashRouter} from 'react-router-dom'
import './App.css';
import LoginForm from './pages/LoginForm';

function App() {
  return (
    <div className="App">
      <HashRouter >
        <MainLayout>
          <LoginForm />
        </MainLayout>
      </HashRouter>
    </div>
  );
}

export default App;
