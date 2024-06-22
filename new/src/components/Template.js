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
    const [render, setRender] = useState(false)
    const [userDetails, setDetails] = useState([])
    const [useritems, setUserItems] = useState([])
    const totalAmount = billItems.reduce((total, item) => total + (item.cubicMeter * item.rate), 0);
    React.useEffect(() => {
        const params = { action: 'get_all_users', delete_flag: 0 };
        Console("users")

        axios.get(`${Url}/api/v1/client/bill/702`, { params })
            .then(obj => {
                const res = obj.data;
                console.log("Users fetched successfully:", res);
                setUserItems(res.items);
                render ? setDetails(res) : setDetails(res);
            })
            .catch(err => console.error("Error fetching users:", err));
        // .then(err => console.log("eoeee", err))
    }, [render])
    return (
        <Paper sx={{
            border: '2px solid black', padding: '30px', maxWidth: '70%', marginX: 'auto'
        }}>
            <Box display={'flex'} gap={40}>
                <Typography  gutterBottom>
                    GSTIN-23CXDPP2257G1ZL
                </Typography>
                <Typography>॥ श्री गणेशाय नमः ।।</Typography>
            </Box>
            <Typography marginY={10} display={'flex'} justifyContent={'center'} variant='h2'>{userDetails.fermName}</Typography>
            <Typography marginBottom={5} display={'flex'} justifyContent={'center'} variant='h4'>GuradiaKala,Tehsil-Bagli,Dewas,MadhyaPradesh</Typography>
            <Box bgcolor={'blue'}>
                <Typography color={'#ffffff'} display={'flex'} justifyContent={'center'} variant='h5'>हमारे यहां सभी प्रकार की काली गिट्टी उपलब्ध है।</Typography>
            </Box>
            <Typography marginY={5} display={'flex'} justifyContent={'center'} >मो. 7389272864</Typography>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography marginY={2} >Bill NUMBER:- 20</Typography>
                <Typography marginY={2} >Date:- {userDetails.date}</Typography>
            </Box>
            <Typography variant='h6'>
                Name:- {userDetails.firstName} {userDetails.lastName}
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>विवरण</TableCell>
                            <TableCell>मात्रा</TableCell>
                            <TableCell>घन मीटर</TableCell>
                            <TableCell>भाव</TableCell>
                            <TableCell>रुपये</TableCell>
                            <TableCell>CGST Amount</TableCell>
                            <TableCell>SGST Amount</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {useritems.map((items) => (
                            <TableRow key={items.id}>
                                <TableCell >{items.size}</TableCell>
                                <TableCell>{items.quantity}</TableCell>
                                <TableCell>{items.cubicMeter}</TableCell>
                                <TableCell>{items.rate}</TableCell>
                                <TableCell>{items.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} flexDirection={'column'}>
                    <Typography marginY={2}>CGST 2.5%:- {userDetails.cgstAmount}</Typography>
                    <Typography marginY={2}>SGST 2.5%:- {userDetails.sgstAmount}</Typography>
                    <Typography marginY={2}>Total:- {userDetails.totalAmount}</Typography>
                    <Typography marginY={2}>Remaining Amount:- {userDetails.remainingAmount}</Typography>
                </Box>
                <Box>
                    <Typography marginY={2}>AMOUNT:- 1500000</Typography>
                </Box>
            </Box>
            <Box>
                <Typography marginY={2}>
                    नोट:- 1. माल की रायल्टी के रुपये अलग से देना होगें।
                </Typography>
                <Typography marginLeft={4.5}>
                    2. रायल्टी रसीद नहीं लेने पर यदि वाहन जप्ती हुआ तो उसकी हमारी कोई जवाबदारी नहीं रहेगी।
                </Typography>
            </Box>
            <Box>
                <Typography display={'flex'} justifyContent={'right'} marginRight={15}>
                    हस्ताक्षर
                </Typography>
            </Box>
        </Paper>
    );
};

export default Template;