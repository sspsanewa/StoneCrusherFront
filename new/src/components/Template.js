// Bill.js
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Console from '../debug_log';
import Url from '../Config/Url';

import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Template = () => {
    // Dummy data for the bill
    const billItems = [
        { discription: 'G.S.B', cubicMeter: 4285.7, rate: 350 },

    ];

    // Calculate total amount
    const [render, setRender] = useState(false);
    const [userDetails, setDetails] = useState([]);
    const [useritems, setUserItems] = useState([]);
    const totalAmount = billItems.reduce((total, item) => total + (item.cubicMeter * item.rate), 0);
    React.useEffect(() => {
        const params = { action: 'get_all_users', delete_flag: 0 };
        Console("users");

        axios.get(`${Url}/api/v1/client/bill/702`, { params })
            .then(obj => {
                const res = obj.data;
                console.log("Users fetched successfully:", res);
                setUserItems(res.items);
                render ? setDetails(res) : setDetails(res);
            })
            .catch(err => console.error("Error fetching users:", err));
        // .then(err => console.log("eoeee", err))
    }, [render]);

    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            margin: 0,
            padding: '20px',
            backgroundColor: '#f5f5f5',
        },
        invoiceContainer: {
            maxWidth: '800px',
            margin: 'auto',
            padding: '20px',
            backgroundColor: '#fff',
            border: '1px solid #ddd',
        },
        headerFooter: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
        },
        section: {
            width: '48%',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
        },
        thTd: {
            border: '1px solid #000',
            padding: '8px',
            textAlign: 'left',
        },
        th: {
            backgroundColor: '#f0f0f0',
        },
        alignRight: {
            textAlign: 'right',
        },
        totalSection: {
            marginTop: '20px',
        },
        totalText: {
            fontWeight: 'bold',
        },
        declaration: {
            marginTop: '20px',
            fontSize: '12px',
        },
        stamp: {
            textAlign: 'right',
            marginTop: '40px',
        },
    };


    return (
        <Paper sx={{
            border: '2px solid black', padding: '30px', maxWidth: '70%', marginX: 'auto'
        }}>

            <div style={styles.body}>
                <div style={styles.invoiceContainer}>
                    <h2 style={{ textAlign: 'center', margin: 0 }}>Tax Invoice</h2>

                    <div style={styles.headerFooter}>
                        <div style={styles.section}>
                            <strong>RD COMPUTERS</strong><br />
                            Shop No 214, 2nd Floor, B Block<br />
                            Silver Mall, R.N.T Marg, Indore<br />
                            Mob: 9993746321<br />
                            GSTIN: 23AZZPD0261A1ZT<br />
                            Email: rdindore0219@gmail.com
                        </div>
                        <div style={styles.section}>
                            <strong>Invoice No.</strong>: RD/23-24/1644<br />
                            <strong>Date</strong>: 22-Feb-2024<br />
                            <strong>Mode/Terms of Payment</strong>: 1 Days<br />
                            <strong>Supplier’s Ref.</strong>: 1644<br />
                        </div>
                    </div>

                    <div style={styles.headerFooter}>
                        <div style={styles.section}>
                            <strong>Buyer:</strong> NARENDRA PATIDAR<br />
                            <strong>State Name</strong>: Madhya Pradesh, Code : 23
                        </div>
                    </div>

                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.thTd, ...styles.th }}>Sl No</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Description of Goods</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>HSN/SAC</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Quantity</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Rate</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Disc. %</th>
                                <th style={{ ...styles.thTd, ...styles.th }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styles.thTd}>1</td>
                                <td style={styles.thTd}>Lenovo 65W Type C Laptop Adapter</td>
                                <td style={styles.thTd}>8504</td>
                                <td style={styles.thTd}>1 PCS</td>
                                <td style={styles.thTd}>1,500.00</td>
                                <td style={styles.thTd}>15.25%</td>
                                <td style={styles.thTd}>1,271.18</td>
                            </tr>
                        </tbody>
                    </table>

                    <div style={styles.totalSection}>
                        <p style={styles.totalText}>Total Amount Chargeable (in words): <em>INR One Thousand Five Hundred Only</em></p>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={{ ...styles.thTd, ...styles.th }}>HSN/SAC</th>
                                    <th style={{ ...styles.thTd, ...styles.th }}>Taxable Value</th>
                                    <th style={{ ...styles.thTd, ...styles.th }}>Central Tax Rate</th>
                                    <th style={{ ...styles.thTd, ...styles.th }}>Central Tax Amount</th>
                                    <th style={{ ...styles.thTd, ...styles.th }}>State Tax Rate</th>
                                    <th style={{ ...styles.thTd, ...styles.th }}>State Tax Amount</th>
                                    <th style={{ ...styles.thTd, ...styles.th }}>Total Tax Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={styles.thTd}>8504</td>
                                    <td style={styles.thTd}>1,271.18</td>
                                    <td style={styles.thTd}>9%</td>
                                    <td style={styles.thTd}>114.41</td>
                                    <td style={styles.thTd}>9%</td>
                                    <td style={styles.thTd}>114.41</td>
                                    <td style={styles.thTd}>228.82</td>
                                </tr>
                            </tbody>
                        </table>
                        <p style={styles.totalText}>Tax Amount (in words): <em>INR Two Hundred Twenty Eight and Eighty Two Paise Only</em></p>
                    </div>

                    <div style={styles.headerFooter}>
                        <div style={styles.declaration}>
                            <p><strong>Company’s PAN</strong>: AZZPD0261A</p>
                            <p>We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.</p>
                            <p><strong>SUBJECT TO INDORE JURISDICTION</strong></p>
                            <p>This is a Computer Generated Invoice</p>
                        </div>
                        <div style={styles.stamp}>
                            <p>For RD COMPUTERS</p>
                            <p>Authorized Signatory</p>
                        </div>
                    </div>
                </div>
            </div>

        </Paper>
    );
};

export default Template;