import './App.css';
import "./graphs/LineGraph";
import LineGraph from './graphs/LineGraph';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import EditGraph from "./EditGraph";
import Home from './Home';
import New from './New';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path="/:id" element={<LineGraph />} />
          <Route path="/new" element={<New />} />
          <Route path="/:id/edit" element={<EditGraph />} />
          <Route exact path='/graph' element={<EditGraph />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;