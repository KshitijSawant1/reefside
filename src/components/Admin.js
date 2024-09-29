import React, { useState, useEffect } from "react";
import { db } from "./firebase-config.js";
import {
  collection,
  getDocs, // R
  doc, // R & U
  deleteDoc, // D
} from "firebase/firestore";
import "./Admin.css"; // Import the CSS

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const ordersCollectionRef = collection(db, "Orders");

  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(ordersCollectionRef);
      setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getOrders();
  }, []);

  const deleteOrder = async (id) => {
    const orderDoc = doc(db, "Orders", id);
    await deleteDoc(orderDoc);
    setOrders(orders.filter((order) => order.id !== id)); // Remove the order locally
    setMessage("Order marked as Paid successfully!");
  };

  return (
    <div className="admin-container">
      {message && <p className="success-message">{message}</p>}
      {orders.map((order) => {
        return (
          <div key={order.id} className="order-card">
            <b>Order Details:</b>

            <ul className="order-details">
              {Object.keys(order.dishes).map((dishName) => (
                <li key={dishName}>
                  {dishName}: {order.dishes[dishName]}
                </li>
              ))}
            </ul>

            <div className="order-info">
              <p>GST Amount: {order.gstAmount}</p>
              <p>Total: {order.total}</p>
              <p>Total with GST: {order.totalWithGST}</p>
            </div>

            <button
              className="paid-button"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to mark this order as paid?"
                  )
                ) {
                  deleteOrder(order.id);
                }
              }}
            >
              Paid
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Admin;
