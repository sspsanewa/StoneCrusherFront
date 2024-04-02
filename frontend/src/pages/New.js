import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

const New = () => {
  const [billData, setBillData] = useState({
    customerName: 'John Doe',
    items: [
      { name: 'Item 1', price: 10, quantity: 2 },
      { name: 'Item 2', price: 20, quantity: 1 },
    ],
    // Add more bill data as needed
  });

  const generateBill = () => {
    // Fill the bill template with data
    const itemsHTML = billData.items.map((item, index) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.quantity}</td>
        <td>${item.price}</td>
        <td>${item.quantity * item.price}</td>
      </tr>
    ));

    const total = billData.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const billTemplate = `
      <div>
        <h1>Bill for ${billData.customerName}</h1>
       <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Styled Table</title>
<style>
    table {
        width: 100%;
        border-collapse: collapse;
    }
    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    th {
        background-color: #f2f2f2;
    }
    tr:hover {
        background-color: #f5f5f5;
    }
</style>
</head>
<body>

<table>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Row 1, Cell 1</td>
      <td>Row 1, Cell 2</td>
      <td>Row 1, Cell 3</td>
    </tr>
    <tr>
      <td>Row 2, Cell 1</td>
      <td>Row 2, Cell 2</td>
      <td>Row 2, Cell 3</td>
    </tr>
    <tr>
      <td>Row 3, Cell 1</td>
      <td>Row 3, Cell 2</td>
      <td>Row 3, Cell 3</td>
    </tr>
  </tbody>
</table>

</body>
</html>
        <p>Total: $${total}</p>
      </div>
    `;

    // Convert HTML to PDF
    html2pdf().from(billTemplate).save();
  };

  return (
    <div>
      {/* Render your bill data and other UI elements */}
      <button onClick={generateBill}>Generate Bill</button>
    </div>
  );
};

export default New;
