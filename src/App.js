import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    let pageSize = 6;
    return (
      <>
        <Router>
          <Navbar />

          <Routes>
            <Route path='/' element={<News key="general" pageSize={pageSize} category="general" />} />
            <Route path='/entertainment' element={<News key="entertainment" pageSize={pageSize} category="entertainment" />} />
            <Route path='/sports' element={<News key="sports" pageSize={pageSize} category="sports" />} />
            <Route path='/science' element={<News key="science" pageSize={pageSize} category="science" />} />
            <Route path='/health' element={<News key="health" pageSize={pageSize} category="health" />} />
            <Route path='/business' element={<News key="business" pageSize={pageSize} category="business" />} />
            <Route path='/technology' element={<News key="technology" pageSize={pageSize} category="technology" />} />

          </Routes>

        </Router>
      </>
    )
  }
}

