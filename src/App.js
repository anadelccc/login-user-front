import React from 'react';
import './App.css';
import Login from './components/login/login'
import Register from './components/registro/register';
import UsersList from './components/dashboard/usersList';

function App() {
  return (
    <div className="App">
     <Login />
     <Register />
     <UsersList />
    </div>
  );
}

export default App;
