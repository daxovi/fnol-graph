import './App.css';
import "./graphs/LineGraph";
import LineGraph from './graphs/LineGraph';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import EditGraph from "./Graph";
import Home from './Home';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path="/:id" element={<LineGraph />} />
          <Route path="/:id/edit" element={<EditGraph />} />
          <Route exact path='/graph' element={<EditGraph />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;