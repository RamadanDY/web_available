import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Body from './Body';
 import BlockA from './BlockA';
 import BlockB from './BlockB';
 import BlockC from './BlockC';
 import BlockD from './BlockD';
 import BlockE from './BlockE';
 import BlockF from './BlockF';
 import Confirm from "./Confirm"
import TimeD from './TimeD';
 
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
            path="/timeduration"
             element={
              <>
                <Navbar />
                <TimeD />
              </>
            } 
          />
              
      </Routes>
    </Router>
  );
}

export default App;
