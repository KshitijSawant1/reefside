// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Title from "./components/Title";
import Paymentlog from "./components/Paymentlog";
import Table from "./components/Table";
import { db } from "./components/firebase-config.js";
import { collection, addDoc } from "firebase/firestore";

function MainPage() {
  const [currentdish, setCurrentdish] = useState([]);
  const usersCollectionRef = collection(db, "Orders");

  const clearReceipt = async () => {
    const getTotal = () => {
      return currentdish.reduce((total, dish) => total + dish.price, 0);
    };

    const calculateGST = (total) => {
      const gstRate = 0.18; 
      return Math.round((total * gstRate) * 100) / 100; 
    };

    const getTotalWithGST = (total, gstAmount) => {
      return Math.round((total + gstAmount) * 100) / 100; 
    };

    try {
  
      const dishesObject = currentdish.reduce((acc, dish) => {
        acc[dish.name] = dish.price;
        return acc;
      }, {});

      const total = getTotal(); 
      const gstAmount = calculateGST(total);
      const totalWithGST = getTotalWithGST(total, gstAmount); 


      await addDoc(usersCollectionRef, {
        dishes: dishesObject,
        total: total,
        gstAmount: gstAmount,
        totalWithGST: totalWithGST,
      });
     // console.log(addDoc);
     // console.log(setCurrentdish([]));
      setCurrentdish([]);
    } catch (error) {
      console.error("Error adding document:", error);
    }
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
