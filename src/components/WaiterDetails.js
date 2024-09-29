import React, { useState } from "react";
const WaiterDetails = () => {
return (
  <div>
    <h1>Waiter details Page </h1>
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
