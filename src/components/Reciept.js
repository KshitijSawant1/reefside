import React from "react";
import "./Design.css";

const Receipt = ({ currentdish, clearReceipt }) => {
  const getTotal = () => {
    let total = 0;
    currentdish.forEach((dish) => {
      total += dish.price;
    });
    return total;
  };

  const handleClearReceipt = () => {
    clearReceipt();
  };

  return (
    <div className="Receipt">
      <ul className="ReceiptList">
        {currentdish.map((dish, index) => (
          <li key={index} className="ReceiptEntry">
            {dish.name} - {dish.price}
          </li>
        ))}
      </ul>
      <div className="ReceiptFooter">
        <p>Total: ₹{getTotal()}</p>
        <button onClick={handleClearReceipt}>Clear Receipt</button>
      </div>
    </div>
  );
};

export default Receipt;
