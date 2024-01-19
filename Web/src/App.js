import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Header from './components/Header';
import Header2 from './components/Header2';
import './App.css';

function App() {
  const [showOne, setShowOne] = useState(true);

  const toggleHeader = () => {
    setShowOne(!showOne);
  };

  return (
    <main className='header-bg'>
    {showOne ? (
      <Navbar toggleHeader={toggleHeader} /> // Sử dụng Navbar hoặc Navbar2 tùy thuộc vào showOne
    ) : (
      <Navbar2 toggleHeader={toggleHeader} />
    )}
    <div>
      {showOne ? (
        <Header toggleHeader={toggleHeader} />
      ) : (
        <Header2 toggleHeader={toggleHeader} />
      )}
    </div>
  </main>
  );
}

export default App;