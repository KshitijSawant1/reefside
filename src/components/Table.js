import React from "react";
import "./Design.css";

const Table = ({ currentdish, setCurrentdish }) => {
  const handleButtonClick = (newDish) => {
    setCurrentdish([...currentdish, newDish]);
  };

  return (
    <div className="Table">
      <div className="TableRow1">
        <button
          className="TableButton-1"
          onClick={() =>
            handleButtonClick({ name: "Reefside Salad", price: 1200 })
          }
        ></button>
        <button
          className="TableButton-2"
          onClick={() =>
            handleButtonClick({ name: "Caspian Wrap", price: 1150 })
          }
        ></button>
        <button
          className="TableButton-3"
          onClick={() =>
            handleButtonClick({ name: "Paradise Sushi Roll", price: 1250 })
          }
        ></button>
      </div>
      <div className="TableRow2">
        <button
          className="TableButton-4"
          onClick={() =>
            handleButtonClick({ name: "Lobster Ravioli", price: 1300 })
          }
        ></button>
        <button
          className="TableButton-5"
          onClick={() =>
            handleButtonClick({ name: "Island Burger", price: 1180 })
          }
        ></button>
        <button
          className="TableButton-6"
          onClick={() =>
            handleButtonClick({ name: "Miso-Glazed Skewer", price: 1100 })
          }
        ></button>
      </div>
      <div className="TableRow3">
        <button
          className="TableButton-7"
          onClick={() =>
            handleButtonClick({ name: "Ocean Sunset Spritzer", price: 1080 })
          }
        ></button>
        <button
          className="TableButton-8"
          onClick={() =>
            handleButtonClick({ name: "Coral Breeze Punch", price: 1070 })
          }
        ></button>
        <button
          className="TableButton-9"
          onClick={() =>
            handleButtonClick({ name: "Tidal Wave Lemonade", price: 1060 })
          }
        ></button>
      </div>
    </div>
  );
};

export default Table;
