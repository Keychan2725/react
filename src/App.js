import React, { Component, createContext, useContext, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./page/home";
import DataSekolah from "./page/data_sekolah";
import Sidebar from "./component/sidebar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <div className="App">
            <Sidebar />
            <Routes>
              <Route   exact path="/" element={<Home />}></Route>
              <Route exact path="/DataSekolah"  element={<DataSekolah />} ></Route>
            </Routes>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
