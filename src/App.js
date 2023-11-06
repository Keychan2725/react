import React, { Component, createContext, useContext, useState } from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./page/home";
import DataSekolah from "./page/data_sekolah";
import Sidebar from "./component/sidebar";
import  TambahData from "./page/tambah_data"
import UbahData from "./page/update_data";
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
              <Route exact path="/TambahData"  element={<TambahData />} ></Route>
              <Route path="/UbahData/:id" element={<UbahData />} />
            </Routes>
          </div>
        </Router>
      </>
    );
  }
}

export default App;
