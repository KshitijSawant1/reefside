import React, { useState, useEffect } from "react";
import { db } from "./firebase-config.js";

import { 
  collection, 
  getDocs,   // R
  addDoc,    // C
  updateDoc, // U
  doc,       // U
  deleteDoc  // D
} from "firebase/firestore";


const WaiterDetails = () => {

  const [newName, setNewName] = useState("");
  const [newId_, setNewId_] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [newSalary, setNewSalary] = useState(0);

  const [waiters, setWaiters] = useState([]);
  const waitersCollectionRef = collection(db, "Waiters");

  const createWaiter = async () => {
    await addDoc(waitersCollectionRef, { 
      name: newName,
      id_: Number(newId_),
      address: newAddress,
      salary: Number(newSalary)
    });
  }

  const editWaiter = async (id) => {
    const nameInput = prompt("Enter Name: ");
    const id_Input = parseInt(prompt("Enter ID: "));
    const addressInput = prompt("Enter Address: ");
    const salaryInput = parseInt(prompt("Enter Salary:"));
  
    const waiterDoc = doc(db, "Waiters", id);

    const newFields = { 
      name: nameInput, 
      id_: id_Input, 
      address: addressInput, 
      salary: salaryInput, 
    };
    await updateDoc(waiterDoc, newFields);
  };

  const editWaiterName = async (id) => {
    const nameInput = prompt("Enter Name:");
  
    const waiterDoc = doc(db, "Waiters", id);

    const newFields = { name: nameInput };
    await updateDoc(waiterDoc, newFields);
  };

  const editWaiterId_ = async (id) => {
    const id_Input = parseInt(prompt("Enter ID:"));
  
    const waiterDoc = doc(db, "Waiters", id);

    const newFields = { id_: id_Input };
    await updateDoc(waiterDoc, newFields);
  };

  const editWaiterAddress = async (id) => {
    const addressInput = prompt("Enter Address:");
  
    const waiterDoc = doc(db, "Waiters", id);

    const newFields = { address: addressInput };
    await updateDoc(waiterDoc, newFields);
  };

  const editWaiterSalary = async (id) => {
    const salaryInput = parseInt(prompt("Enter Salary:"));
  
    const waiterDoc = doc(db, "Waiters", id);

    const newFields = { salary: salaryInput };
    await updateDoc(waiterDoc, newFields);
  };

  const deleteWaiter = async (id) => {
    const waiterDoc = doc(db, "Waiters", id);
    await deleteDoc(waiterDoc);
  }

  useEffect(() => {
    const getWaiters = async () => {
      const data = await getDocs(waitersCollectionRef);
      setWaiters(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(waiters);
    };
    getWaiters();
  },[]);


  return (
    <div className="WaiterDetails">

      <input placeholder="Name" onChange={(event) => {
        setNewName(event.target.value);
      }}
      /><br/>

      <input type="number" placeholder="ID" onChange={(event) => {
        setNewId_(event.target.value);
      }}/><br/>

      <input placeholder="Address" onChange={(event) => {
        setNewAddress(event.target.value);
      }}/><br/>

      <input type="number" placeholder="Salary" onChange={(event) => {
        setNewSalary(event.target.value);
      }}/><br/>

      <button onClick={createWaiter}>Add</button><br/><br/>

      {
        waiters.map((waiter) => {
          return (
            <div>
              <b>Name : {waiter.name}</b> 
              {/* <button onClick={() => {editWaiterName(waiter.id)}}>🖍</button> <br/> */}
              <button onClick={() => {editWaiterName(waiter.id)}}>✎</button> <br/>
              
              <b>ID : {waiter.id_}</b> 
              <button onClick={() => {editWaiterId_(waiter.id)}}>✎</button> <br/>

              <b>Address : {waiter.address}</b> 
              <button onClick={() => {editWaiterAddress(waiter.id)}}>✎</button> <br/>

              <b>Salary : {waiter.salary}</b> 
              <button onClick={() => {editWaiterSalary(waiter.id)}}>✎</button> <br/>
              
              <button onClick={() => {editWaiter(waiter.id)}}> Update </button>
              <button onClick={() => {deleteWaiter(waiter.id)}}> Delete </button>
              <br/><br/>
            </div>
          )
        })
      }

    </div>
  );
};
export default WaiterDetails;


/*
import React, { useState } from 'react';
import './Card.css'; // Assuming this is your CSS file for styling the cards

const WaiterDetails = () => {
  const [waiters, setWaiters] = useState([
    { name: 'John Doe', id: 1, address: '123 Main St', salary: 1500 },
    { name: 'KS', id: 2, address: 'Mumbai', salary: 10000 },
    { name: 'AB', id: 3, address: 'Delhi', salary: 1000000 },
  ]);

  const [newWaiter, setNewWaiter] = useState({ name: '', id: '', address: '', salary: '' });

  const handleUpdate = (index) => {
    alert('Waiter details updated successfully!');
  };

  const handleDelete = (index) => {
    const updatedWaiters = waiters.filter((_, i) => i !== index);
    setWaiters(updatedWaiters);
  };

  const handleInputChange = (index, field, value) => {
    const updatedWaiters = [...waiters];
    updatedWaiters[index][field] = value;
    setWaiters(updatedWaiters);
  };

  const handleNewWaiterChange = (field, value) => {
    setNewWaiter({ ...newWaiter, [field]: value });
  };

  const addWaiter = () => {
    if (newWaiter.name && newWaiter.id && newWaiter.address && newWaiter.salary) {
      setWaiters([...waiters, newWaiter]);
      setNewWaiter({ name: '', id: '', address: '', salary: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="card-container">
      {waiters.map((waiter, index) => (
        <div className="card" key={index}>
          <input
            type="text"
            value={waiter.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            value={waiter.id}
            onChange={(e) => handleInputChange(index, 'id', e.target.value)}
            placeholder="ID"
          />
          <input
            type="text"
            value={waiter.address}
            onChange={(e) => handleInputChange(index, 'address', e.target.value)}
            placeholder="Address"
          />
          <input
            type="text"
            value={waiter.salary}
            onChange={(e) => handleInputChange(index, 'salary', e.target.value)}
            placeholder="Salary"
          />
          <div className="button-container">
            <button className="update-button" onClick={() => handleUpdate(index)}>
              Update
            </button>
            <button className="delete-button" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="add-waiter-container">
        <div className="card">
          <h3>Add New Waiter</h3>
          <input
            type="text"
            placeholder="Name"
            value={newWaiter.name}
            onChange={(e) => handleNewWaiterChange('name', e.target.value)}
          />
          <input
            type="text"
            placeholder="ID"
            value={newWaiter.id}
            onChange={(e) => handleNewWaiterChange('id', e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={newWaiter.address}
            onChange={(e) => handleNewWaiterChange('address', e.target.value)}
          />
          <input
            type="text"
            placeholder="Salary"
            value={newWaiter.salary}
            onChange={(e) => handleNewWaiterChange('salary', e.target.value)}
          />
          <button className="add-waiter-button" onClick={addWaiter}>
            Add Waiter
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaiterDetails;
*/
