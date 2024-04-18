// Bill.js
import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Template = () => {
    // Dummy data for the bill
    const billItems = [
        { discription: 'G.S.B', cubicMeter: 4285.7, rate: 350 },

    ];

    // Calculate total amount
    const totalAmount = billItems.reduce((total, item) => total + (item.cubicMeter * item.rate), 0);

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
                <Typography marginY={2} variant='h5'>दिनांक:- 27/2/24</Typography>
            </Box>
            <Typography variant='h5'>
                श्रीमान:- Bindal developer 23 ATH PB1234B/Z8
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>विवरण</TableCell>
                            <TableCell>घन मीटर</TableCell>
                            <TableCell>भाव</TableCell>
                            <TableCell>रुपये</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {billItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.discription}</TableCell>
                                <TableCell>${item.cubicMeter}</TableCell>
                                <TableCell>{item.rate}</TableCell>
                                <TableCell>${item.cubicMeter * item.rate}</TableCell>
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
