 
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
  import TimeD from './pages/TimeD';
  import Completed from './pages/Completed';
import CountdownTimer from './pages/CountdownTimer';

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
                <BlockA blockName="BlockA" />

               </> 
            } 
          />   
          <Route 
            path="/blockb" 
            element={
              <>
                <Navbar />
                <BlockB blockName="BlockB"  />
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
            path="/confirm/:classId"
             element={
              <>
                <Navbar />
                <Confirm />
              </>
            } 
          />
          <Route  
            path="/timeduration/:blockId/:classId" 
             element={
              <>
                <Navbar />
                <TimeD />
               </>
            } 
          />
          <Route  
            path="/Completed"
             element={
              <>
                <Navbar />
                <Completed/>
              </> 
            } 
          />
          <Route  
            path="/CountdownTimer"
             element={
              <>
                <Navbar />
                <CountdownTimer/>
              </> 
            } 
          />

      </Routes>
    </Router>
  );
}

export default App;