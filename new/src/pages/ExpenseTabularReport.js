import { Alert, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import { Helmet } from 'react-helmet';

import UserTabularReportTable from '../components/TableUserTabularReport';
import Constant from '../Config/Color'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Console from '../debug_log';
import Url from '../Config/Url';
import axios from 'axios';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import Language from '../Config/Language'
import ExpenseTabularReportTable from '../components/TableExpenseTabularReport';

const ExpenseTabularReport = () => {

    const navigate = useNavigate()
    const [userList, setUserList] = useState([])

    const [render, setRender] = useState(false)

    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)

    const handleFromDateChange = (date) => {
        setFromDate(date);
    };
    const handleToDateChange = (date) => {
        setToDate(date);
    };
    Console("tabular", fromDate, toDate)

    const formatMySQLDateTime = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month since it's zero-based
        const day = (date.getDate()).toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };



    // Format startDate and endDate for MySQL query
    const formattedStartDate = formatMySQLDateTime(new Date(fromDate));
    const formattedEndDate = formatMySQLDateTime(new Date(toDate));
    React.useEffect(() => {

        const params = { startDate: formattedStartDate, endDate: formattedEndDate };
        Console("users", params)

        axios.get(`${Url}/api/v1/report/expense`, { params })
            .then(obj => {
                const res = obj.data;
                console.log("Users fetched successfully:", res);
                setUserList(res)
            })
            .catch(err => console.error("Error fetching users:", err));
        // .then(err => console.log("eoeee", err))
    }, [userList.length])


    const handleSearch = () => {
        if (fromDate === null || toDate === null) {
            setShow1(true)
        } else {
            setShow(true)
            render ? setRender(false) : setRender(true)
        }
    }


    show1 && setTimeout(() => { setShow1(false); }, 4000)
    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Helmet>
                <title>{Language.APP_NAME} | Expense Tabular Report</title>
            </Helmet>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box marginBottom={2} gap={1} display={'flex'}>
                    <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                        Dashboard
                    </Button>
                    <Typography marginTop={1.2} fontSize={20} >/</Typography>

                    <Typography marginTop={1.2} fontSize={20} >Expense Tabular Report</Typography>
                </Box>
                {show1 &&
                    <Alert sx={{ bgcolor: '#ffffff', marginBottom: '5px' }} variant="outlined" severity="error">
                        Please enter date
                    </Alert>
                }
            </Box>
            <Box paddingLeft={2} paddingY={3} bgcolor={'#ffffff'} display={'flex'} justifyContent={'left'} alignItems={'center'} gap={15} sx={{ width: '100%', borderRadius: '15px' }}>
                <Box marginY={{ xs: '20px', md: '0px' }}>
                    <Typography>From Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="From Date"
                                value={fromDate}
                                onChange={handleFromDateChange}
                                format="YYYY-MM-DD"


                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
                <Box marginY={{ xs: '20px', md: '0px' }}>
                    <Typography>To Date</Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="To Date"
                                value={toDate}
                                onChange={handleToDateChange}
                                format="YYYY-MM-DD"

                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Box>
                <Button sx={{ marginTop: '25px' }} onClick={handleSearch} size='small' variant='contained' style={{ backgroundColor: Constant.color[0] }}>Search</Button>
            </Box>
            {
                (show && userList) &&
                <Grid marginLeft={1.5} marginY={4} item xs={12}>
                    <ExpenseTabularReportTable userList={userList} />
                </Grid>
            }
        </Box >

    )
}

export default ExpenseTabularReport
