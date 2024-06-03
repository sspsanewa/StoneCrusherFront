import React, { useState } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import Url from '../Config/Url';
import Console from '../debug_log';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import Constant from '../Config/Color'
import Language from '../Config/Language'

const UserAnalyticalReport = () => {
    const [clickedData, setClickedData] = useState(null);
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])

    const handleBarClick = (data) => {
        console.log('data', data)
        setClickedData(data);
    };
    const navigate = useNavigate()

    React.useEffect(() => {
        const params = { action: 'get_user_analytical_reports' };
        console.log("send", params)
        axios.get(`${Url}/report_controller/user_analytical_reports`, { params })
            .then(obj => {
                const res = obj.data;
                setData(res.data.user_arr)
            })
            .catch(err => console.log("eroor", err))
    }, [])

    React.useEffect(() => {
        const params = { action: 'get_user_analytical_reports_yearly' };
        console.log("send", params)
        axios.get(`${Url}/report_controller/user_analytical_reports_yearly`, { params })
            .then(obj => {
                const res = obj.data;
                setData1(res.data.user_arr)
            })
            .catch(err => console.log("eroor", err))
    }, [])
    Console("monthlyreport yearly", data, data1)

    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Helmet>
                <title>{Language.APP_NAME} | Users Analytical Report</title>
            </Helmet>

            <Box marginBottom={2} display={'flex'} justifyContent={'space-between'}>
                <Box marginBottom={2} gap={1} display={'flex'}>
                    <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                        Dashboard
                    </Button>
                    <Typography marginTop={1.2} fontSize={20} >/</Typography>

                    <Typography marginTop={1.2} fontSize={20} >Users Analytical Report</Typography>
                </Box>
            </Box>

            <Box paddingTop={5} borderRadius={2} bgcolor={Constant.color[1]}  >
                <Box display='flex' justifyContent='center'>
                    <Typography style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={20}><b>2024 Monthly Analytical Reports of Users</b></Typography>
                </Box>
                <BarChart
                    yAxis={[{ label: Language.APP_NAME }]}
                    xAxis={[{ label: 'Months', scaleType: 'band', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] }]}
                    series={[{ data: data, color: Constant.color[0] }]}
                    width={800}
                    height={300}
                    onBarClick={handleBarClick}
                    sx={{ padding: '10px' }}

                />
                {clickedData && <p>Clicked Bar Data: {clickedData}</p>}
            </Box>
            <Box marginTop={5} paddingTop={5} borderRadius={2} bgcolor={Constant.color[1]}  >
                <Box display='flex' justifyContent='center'>
                    <Typography style={{ fontFamily: 'Roboto', fontWeight: 100, color: 'gray' }} fontSize={20}><b>2024 Yearly Analytical Reports of Users</b></Typography>
                </Box>
                <BarChart
                    yAxis={[
                        {
                            label: Language.APP_NAME,
                        },
                    ]}
                    xAxis={[{ label: 'Years', scaleType: 'band', data: ['2024', '2025', '2026', '2027', '2028'] }]}
                    series={[{ data: data1, color: Constant.color[0] }]}
                    width={800}
                    height={300}
                    sx={{ padding: '10px' }}

                />
            </Box>
        </Box >

    )
}

export default UserAnalyticalReport