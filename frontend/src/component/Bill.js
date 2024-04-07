

import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Typography } from '@mui/material';

const Bill = () => {
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
<!DOCTYPE html >
  <html lang="en">
    <head>
      <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Structured Table</title>
          <style>
            table {
              width: 100%;
            border-collapse: collapse;
  }
            th, td {
              border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
  }
            th {
              background-color:aqua;
  }
          </style>
        </head>
        <body>

          <h2>Well-Structured Table</h2>

          <table id="myTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John</td>
                <td>30</td>
                <td>USA</td>
              </tr>
              <tr>
                <td>Jane</td>
                <td>25</td>
                <td>Canada</td>
              </tr>
              <tr>
                <td>Alice</td>
                <td>35</td>
                <td>UK</td>
              </tr>
            </tbody>
          </table>

          <script>
  // JavaScript code can be added here
          // For example, you can add code to manipulate the table dynamically
          </script>

        </body>
      </html>

`
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

export default Bill;