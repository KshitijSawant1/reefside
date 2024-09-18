import React, { useState } from "react";

const TableButton = ({ tableNumber }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setOrderedItems([]);
  };

  const handleAddItem = (item) => {
    setOrderedItems((prevItems) => [...prevItems, item]);
  };

  const handleRemoveItem = (index) => {
    setOrderedItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const getTotal = () => {
    let total = 0;
    orderedItems.forEach((item) => {
      total += item.price;
    });
    return total.toFixed(2);
  };

  return (
    <div>
      <button className="TableButton" onClick={handleButtonClick}>
        Table {tableNumber}
      </button>
      {modalOpen && (
        <div className="Modal">
          <div className="ModalContent">
            <h3>Table {tableNumber} Order</h3>
            <ul className="OrderedItems">
              {orderedItems.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price.toFixed(2)}
                  <button onClick={() => handleRemoveItem(index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p>Total: ${getTotal()}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableButton;
