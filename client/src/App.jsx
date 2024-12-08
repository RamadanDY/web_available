import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Body from './pages/Body';
 import BlockA from './pages/BlockA';
 import BlockB from './pages/BlockB';
 import BlockC from './pages/BlockC';
 import BlockD from './pages/BlockD';
 import BlockE from './pages/BlockE';
 import BlockF from './pages/BlockF';
 import Confirm from "./pages/Confirm"
 
function App() {
  return (
    <Router>
      <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Body />
              </>
            } 
          />
         
          <Route 
            path="/blocka" 
            element={
              <>
                <Navbar />
                <BlockA />
              </> 
            } 
          />   
          <Route 
            path="/blockb" 
            element={
              <>
                <Navbar />
                <BlockB />
              </> 
            } 
          />   
          <Route 
            path="/blockc" 
            element={
              <>
                <Navbar />
                <BlockC />
              </> 
            } 
          />   
          <Route 
            path="/blockd" 
            element={
              <>
                <Navbar />
                <BlockD />
              </> 
            } 
          />   
          <Route 
            path="/blocke" 
            element={
              <>
                <Navbar />
                <BlockE />
              </> 
            } 
          />   
          <Route 
            path="/blockf" 
            element={
              <>
                <Navbar />
                <BlockF />
              </> 
            } 
          />   
          <Route  
            path="/confirm"
            element={
              <>
                <Navbar />
                <Confirm />
              </>
            } 
          />
              
      </Routes>
    </Router>
  );
}

export default App;
