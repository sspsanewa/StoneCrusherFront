import { Box, Button, Grid, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import UserReportTable from './Table/UserReportTable';
import axios from 'axios';

const UserReport = () => {
    const navigate = useNavigate();
    const [fromDate, setFromDate] = React.useState('');
    const [toDate, setToDate] = React.useState('');
    const [userReport, setUserReport] = React.useState([])
    const [search, setSearch] = React.useState(false)
    const handleFromDateChange = (date) => {
        setFromDate(date);
    };
    const handleToDateChange = (date) => {
        setToDate(date);
    };
    React.useEffect(() => {
        const fromDates = `${fromDate.$y}-${1 + fromDate.$M}-${fromDate.$D}`;
        const toDates = `${toDate.$y}-${1 + toDate.$M}-${toDate.$D}`;
        console.log(fromDates, toDates);
        axios.get('http://localhost:5000/userTabularReport/', { params: { fromDates, toDates } })
            .then(res => {
                setUserReport(res.data);
            })
            .catch(err => console.log("errsss:", err));
    }, [fromDate, toDate]);

    const handleSearch = () => {
        setSearch(true)
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} bgcolor='#f1f8e9' >
            <Grid paddingY={1}>
                <Grid marginBottom={4} bgcolor='#ffffff' item xs={12}>
                    <Box paddingY={1} paddingX={3} display='flex' flexDirection={'column'} >
                        <Typography style={{ fontFamily: 'Roboto', fontWeight: 100 }} fontSize={25}><b>User Report</b></Typography>
                        <Box display='flex' gap={1}>
                            <Typography onClick={() => { navigate('/dashboardPage') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>Dashboard</b></Typography>
                            <Typography onClick={() => { navigate('/home') }} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={14}><b>/ User Report</b></Typography>
                        </Box>
                    </Box>
                </Grid>
                <Box paddingTop={2} paddingBottom={4} borderRadius={2} bgcolor='#ffffff' marginX={4}>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Box paddingX={2} paddingTop={2} display='flex' alignItems='center' justifyContent='space-between'>
                                <Typography marginLeft={4} style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={18}><b>User Report</b></Typography>
                            </Box>
                        </Grid>
                        <Grid sx={{
                            display: { xs: 'block', md: 'flex' },
                            width: { xs: '80%', md: '100%' },
                            marginX: { xs: 'auto', md: '0px' },
                        }}
                            marginTop={2}
                            justifyContent='space-around'
                            alignItems='center'
                            display='flex'
                            item xs={12}>
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
                            <Button onClick={handleSearch} size='small' sx={{ height: '30px', bgcolor: "#212121", borderRadius: '15px' }} variant="contained">Search</Button>
                        </Grid>
                    </Grid>

                </Box>
                <Grid margin={4} item xs={12}>
                    {search === true && <UserReportTable userReport={userReport} />}
                </Grid>
            </Grid >
            <Footer />
        </Box >

    );
};

export default UserReport;
