// import React from "react";
//New->
import React,{ useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


const Paymentlog = ({ currentdish, clearReceipt }) => {

  //New->
  // const [total1, setTotal1] = useState(0);

  const getTotal = () => {
    let total = 0;
    currentdish.forEach((dish) => {
      total += dish.price;
      // setTotal1(total);
    });
    //New->
    // setTotal1(total); 
    // console.log(total1);
    // return setTotal1(total), total;
    return total;
  };


  const calculateGST = () => {
    const total = getTotal();
    const gstRate = 0.18; // 18% GST
    const gstAmount = total * gstRate;
    return Math.round(gstAmount * 100) / 100; // Round to 2 decimal places
  };

  const getTotalWithGST = () => {
    const total = getTotal();
    const gstAmount = calculateGST();
    const totalWithGST = total + gstAmount;
    return Math.round(totalWithGST * 100) / 100; // Round to 2 decimal places
  };

  function generatePDF() {
    // Use HTML2Canvas to capture the receipt container
    const receiptContainer = document.querySelector(".Receipt");
    html2canvas(receiptContainer).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Create a new jsPDF instance
      const pdf = new jsPDF();

      // Calculate the width and height of the receipt container
      const containerWidth = receiptContainer.offsetWidth;
      const containerHeight = receiptContainer.offsetHeight;

      // Add the captured image to the PDF
      pdf.addImage(
        imgData,
        "PNG",
        10,
        10,
        containerWidth * 0.75,
        containerHeight * 0.75
      );

      // Save the PDF with a filename
      pdf.save("receipt.pdf");
    });
  }

  function clearReceiptAndGeneratePDF() {
    // Generate the PDF
    generatePDF();
    // Clear the ordered items array (replace with your actual array name)
    clearReceipt();
  }

  return (
    <div className="Paymentlog">
      <div className="Receipt">
        <ul className="ReceiptList">
          {currentdish.map((dish, index) => (
            <li key={index} className="ReceiptEntry">
              {dish.name} - ₹{dish.price}
            </li>
          ))}
        </ul>
      </div>
      <div className="Total">
        <p>| Total w/ GST:₹{getTotalWithGST().toFixed(2)} |</p>
      </div>
      <div className="ClearReceipt">
        <button
          className="ClearReceiptButton"
          onClick={clearReceiptAndGeneratePDF}
        >
          Clear Receipt
        </button>
      </div>
    </div>
  );
};

export default Paymentlog;
