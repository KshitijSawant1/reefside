import "./WaiterDetails.css";
import React, { useState, useEffect } from "react";
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs, // R
  addDoc, // C
  updateDoc, // U
  doc, // U
  deleteDoc, // D
} from "firebase/firestore";

const WaiterDetails = () => {
  const [newName, setNewName] = useState("");
  const [newId_, setNewId_] = useState(0);
  const [newAddress, setNewAddress] = useState("");
  const [newSalary, setNewSalary] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [waiters, setWaiters] = useState([]);
  const waitersCollectionRef = collection(db, "Waiters");

  // Function to check if the given ID already exists
  const isDuplicateId = (idToCheck) => {
    return waiters.some((waiter) => waiter.id_ === idToCheck);
  };

  const createWaiter = async () => {
    // Check if the ID is already taken
    if (isDuplicateId(Number(newId_))) {
      setErrorMessage(`ID ${newId_} already exists. Please enter a unique ID.`);
      return;
    }

    // Add new waiter if no duplicates found
    await addDoc(waitersCollectionRef, {
      name: newName,
      id_: Number(newId_),
      address: newAddress,
      salary: Number(newSalary),
    });

    setErrorMessage(""); // Clear the error message if successful
    window.location.reload(); // Reload the page after adding a waiter
  };

  const editWaiterField = async (id, field, newValue) => {
    const waiterDoc = doc(db, "Waiters", id);
    const newFields = { [field]: newValue }; // Dynamically update the specific field
    await updateDoc(waiterDoc, newFields);
    window.location.reload(); // Reload the page after updating
  };

  const editWaiterId_ = async (id, newId) => {
    if (isDuplicateId(newId)) {
      alert(`ID ${newId} already exists. Please enter a unique ID.`);
      return;
    }
    const waiterDoc = doc(db, "Waiters", id);
    await updateDoc(waiterDoc, { id_: newId });
    window.location.reload(); // Reload the page after updating ID
  };

  const deleteWaiter = async (id) => {
    const waiterDoc = doc(db, "Waiters", id);
    await deleteDoc(waiterDoc);
    window.location.reload(); // Reload the page after deleting a waiter
  };

  useEffect(() => {
    const getWaiters = async () => {
      const data = await getDocs(waitersCollectionRef);
      setWaiters(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getWaiters();
  }, []);

  return (
    <div className="WaiterDetails">
      {/* Card for adding new waiter */}
      <div className="waiter-card add-card">
        <h2>Add New Waiter</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {/* Error message */}
        <input
          placeholder="Name"
          onChange={(event) => setNewName(event.target.value)}
        />
        <input
          type="number"
          placeholder="ID"
          onChange={(event) => setNewId_(event.target.value)}
        />
        <input
          placeholder="Address"
          onChange={(event) => setNewAddress(event.target.value)}
        />
        <input
          type="number"
          placeholder="Salary"
          onChange={(event) => setNewSalary(event.target.value)}
        />
        <button className="btn-action" onClick={createWaiter}>
          Add Waiter
        </button>
      </div>

      {/* Display waiter cards */}
      {waiters.map((waiter) => {
        return (
          <div key={waiter.id} className="waiter-card">
            <div className="b-with-edit">
              <b>Name : {waiter.name}</b>
              <button
                className="edit-button"
                onClick={() => {
                  const newName = prompt("Enter new Name:", waiter.name);
                  if (newName) editWaiterField(waiter.id, "name", newName);
                }}
              >
                ✎
              </button>
            </div>

            <div className="b-with-edit">
              <b>ID : {waiter.id_}</b>
              <button
                className="edit-button"
                onClick={() => {
                  const newId = parseInt(prompt("Enter new ID:", waiter.id_));
                  if (newId && !isDuplicateId(newId))
                    editWaiterId_(waiter.id, newId);
                  else if (isDuplicateId(newId))
                    alert("This ID already exists. Please choose another ID.");
                }}
              >
                ✎
              </button>
            </div>

            <div className="b-with-edit">
              <b>Address : {waiter.address}</b>
              <button
                className="edit-button"
                onClick={() => {
                  const newAddress = prompt(
                    "Enter new Address:",
                    waiter.address
                  );
                  if (newAddress)
                    editWaiterField(waiter.id, "address", newAddress);
                }}
              >
                ✎
              </button>
            </div>

            <div className="b-with-edit">
              <b>Salary : {waiter.salary}</b>
              <button
                className="edit-button"
                onClick={() => {
                  const newSalary = parseInt(
                    prompt("Enter new Salary:", waiter.salary)
                  );
                  if (newSalary)
                    editWaiterField(waiter.id, "salary", newSalary);
                }}
              >
                ✎
              </button>
            </div>

            <div className="update-delete-buttons">
              <button
                className="btn-delete"
                onClick={() => {
                  deleteWaiter(waiter.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
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
