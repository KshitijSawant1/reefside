// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Title from "./components/Title";
import Paymentlog from "./components/Paymentlog";
import Table from "./components/Table";

function MainPage() {
  const [currentdish, setCurrentdish] = useState([]);

  const clearReceipt = () => {
    setCurrentdish([]);
  };

  return (
    <div className="App">
      <Title />
      <Paymentlog currentdish={currentdish} clearReceipt={clearReceipt} />
      <Table
        currentdish={currentdish}
        setCurrentdish={setCurrentdish}
        clearReceipt={clearReceipt}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app" element={<MainPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
