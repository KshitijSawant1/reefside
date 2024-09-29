import React, { useState, useEffect } from 'react';
import { db } from "./firebase-config.js";
import { 
  collection, 
  getDocs,  // R
  doc,      // R & U
  deleteDoc // D
} from "firebase/firestore";

const Admin = () => {
  const [orders, setOrders] = useState([]);
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
  }

  return (
    <div>
      {
        orders.map((order) => {
          return (
            <div key={order.id}>

              <b>Order Details:</b>

              <ul type="none" >
                {Object.keys(order.dishes).map((dishName) => (
                  <li key={dishName}>
                    {dishName}: {order.dishes[dishName]}
                  </li>
                ))}
              </ul>

              <p>GST Amount : {order.gstAmount}</p>
              <p>Total : {order.total}</p>
              <p>Total with GST : {order.totalWithGST}</p>
              <button onClick={() => {deleteOrder(order.id)}}> Paid </button>
              <br/><br/>

            </div>
          );
        })
      }
    </div>
  );
};

export default Admin;
