import React, { Suspense } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/home';
import Artists from './pages/artists';
import Tracks from './pages/tracks';
import Footer from './components/footer';


function App() {
  return (
    <BrowserRouter>
      <div className='w-full min-h-screen bg-gradient-to-t from-cyan-900 to-cyan-500 flex flex-col items-stretch justify-start lg:px-24 px-8'>
        <Link className='text-white font-bold text-center text-4xl pt-32 tracking-widest drop-shadow-lg' to='/'>Spotofy</Link>
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>...please wait</div>}></Suspense>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/artists' element={<Artists />} />
          <Route path='/tracks' element={<Tracks />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
