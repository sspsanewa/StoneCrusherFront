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

        axios.get(`${Url}/api/v1/client/bill/503`, { params })
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
                <Typography variant="h5" gutterBottom>
                    GSTIN-23CXDPP2257G1ZL
                </Typography>
                <Typography>॥ श्री गणेशाय नमः ।।</Typography>
            </Box>
            <Typography marginY={10} display={'flex'} justifyContent={'center'} variant='h2'>श्री श्याम माईनिंग एण्ड ट्रेडिंग</Typography>
            <Typography marginBottom={5} display={'flex'} justifyContent={'center'} variant='h4'>गुराड़िया कलां, तह. बागली जिला-देवास (म.प्र.) </Typography>
            <Box bgcolor={'blue'}>
                <Typography color={'#ffffff'} display={'flex'} justifyContent={'center'} variant='h5'>हमारे यहां सभी प्रकार की काली गिट्टी उपलब्ध है।</Typography>
            </Box>
            <Typography marginY={5} display={'flex'} justifyContent={'center'} variant='h5'>मो. 7389272864</Typography>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography marginY={2} variant='h5'>क्रमांक:- 20</Typography>
                <Typography marginY={2} variant='h5'>दिनांक:- {userDetails.date}</Typography>
            </Box>
            <Typography variant='h5'>
                श्रीमान:- {userDetails.firstName} {userDetails.lastName}
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
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {billItems.map((useritems) => (
                            <TableRow key={useritems.id}>
                                <TableCell>{useritems.size}</TableCell>
                                <TableCell>{useritems.quantity}</TableCell>
                                <TableCell>${useritems.cubicMeter}</TableCell>
                                <TableCell>{useritems.rate}</TableCell>
                                <TableCell>{useritems.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box display={'flex'} flexDirection={'column'}>
                    <Typography marginY={2}>CGST 2.5%:- 37500</Typography>
                    <Typography marginY={2}>SGST 2.5%:- 37500</Typography>
                    <Typography marginY={2}>Total:- 1500000</Typography>
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