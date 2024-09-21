// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Admin from "./components/Admin";
import Title from "./components/Title";
import Paymentlog from "./components/Paymentlog";
import Table from "./components/Table";
//New->
import { db } from "./components/firebase-config.js";


//New->
import { 
  collection, 
  getDocs,   // R
  addDoc,    // C
  updateDoc, // U
  doc,       // U
  deleteDoc  // D
} from "firebase/firestore";


function MainPage() {
  const [currentdish, setCurrentdish] = useState([]);

  //New->
  const usersCollectionRef = collection(db, "Orders");

  const clearReceipt = async () => {

    console.log(currentdish);
    await addDoc(usersCollectionRef, { currentdish });
    setCurrentdish([]);

};

  //New->
  // const [newName, setNewName] = useState("");
  // const [newAge, setNewAge] = useState(0);

  // const createUser = async () => {
  //   await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  // }

  // <button onClick={createUser}>Create User</button><br/><br/>



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
