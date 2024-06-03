import { Alert, Box, Button, Container, Grid, Paper, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import Card from '../components/Card'
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';

import Constant from '../Config/Color';
import Dropdown from '../components/Dropdown';
import Popup from '../components/Popup';
import { Helmet } from 'react-helmet';
import axios from 'axios'
import Url from '../Config/Url';
import Console from '../debug_log';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import SelectSearch from '../components/SelectSearch';
import Language from '../Config/Language'
import New from './New';


let options = []
const Broadcast = () => {
    const navigate = useNavigate()
    const [alignment, setAlignment] = useState('allUser');
    // const [toggleColor1, setToggleColor1] = useState('#ffffff')
    // const [toggleColor2, setToggleColor2] = useState(Constant.color[0])
    // const [toggleColor3, setToggleColor3] = useState(Constant.color[0])
    // const [toggleColor4, setToggleColor4] = useState(Constant.color[0])
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('')
    const [error3, setError3] = useState('');
    const [error4, setError4] = useState('')
    const [clickedButton, setClickedButton] = React.useState('allUser');

    const handleClick = (event, newAlignment) => {
        setAlignment(newAlignment);
        setClickedButton(newAlignment);

    };
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [userList, setUserList] = React.useState([])
    const [selectedList, setSelectedList] = React.useState([])
    const [show, setShow] = React.useState(false)

    show && setTimeout(() => { setShow(false); }, 4000)

    React.useEffect(() => {
        const params = { action: 'get_all_notification_users' };

        axios.get(`${Url}/common_controller/notification_users`, { params })
            .then(obj => {
                const res = obj.data;

                if (res.success) {
                    console.log(res.data)
                    setUserList(res.data.user_arr)
                }
            })
            .catch(err => console.log("Error fetching users:", err));
    }, [])



    for (let i = 0; i < userList.length; i++) {
        options[i] = userList[i].name
    }
    Console("userList", userList.user_arr)

    Console("user option", options)


    const handleSubmit2 = (event) => {
        event.preventDefault();
        if (subject !== '') {
            setError3('')
        }
        if (message !== '') {
            setError4('')
        }
        if (subject === '' && message === '') {
            setError3('Please enter title')
            setError4('Please enter your message')
            return
        }
        if (subject === '') {
            setError3('Please enter title ')
            return
        }
        if (message === '') {
            setError4('Please enter your message')
            return
        }
        const data = { action: 'send', subject: subject, message: message, select_arr: selectedList, userType: 'user' }
        Console("ye agya to", data)
        axios.post(`${Url}/common_controller/send_notification`, data)
            .then(res => {
                if (res.data.success) {
                    setShow(true)
                }
            })
            .catch(err => console.log(err))

    }

    const handleSubmit1 = (event) => {
        event.preventDefault();
        if (subject !== '') {
            setError1('')
        }
        if (message !== '') {
            setError2('')
        }
        if (subject === '' && message === '') {
            setError1('Please enter title')
            setError2('Please enter your message')
            return
        }
        if (subject === '') {
            setError1('Please enter title ')
            return
        }
        if (message === '') {
            setError2('Please enter your message')
            return
        }
        const data = { action: 'send', subject: subject, message: message, select_arr: selectedList, userType: 'all' }
        Console("ye agya to", data)
        axios.post(`${Url}/common_controller/send_notification`, data)
            .then(res => {
                if (res.data.success) {
                    setShow(true)

                }
            })
            .catch(err => console.log(err))

    }
    return (
        <Box paddingY={4} paddingX={8} marginBottom={10}  >
            <Helmet>
                <title>{Language.APP_NAME} | Broadcast</title>
            </Helmet>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box marginBottom={2} gap={1} display={'flex'}>
                    <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                        Dashboard
                    </Button>
                    <Typography marginTop={1.2} fontSize={20} >/</Typography>

                    <Typography marginTop={1.2} fontSize={20} >Broadcast</Typography>


                </Box>                {show &&
                    <Alert sx={{ marginBottom: '5px' }} variant="outlined" severity="success">
                        Message send successfully
                    </Alert>
                }

            </Box>

            <Grid paddingY={2} marginTop={2} item xs={12}>
                <ToggleButtonGroup
                    color='primary'
                    value={alignment}
                    exclusive
                    aria-label="Platform"

                >
                    <ToggleButton style={{ backgroundColor: clickedButton === 'allUser' ? Constant.color[0] : 'inherit', color: clickedButton === 'allUser' ? 'white' : Constant.color[0], }} value="allUser" onClick={(e) => handleClick(e, 'allUser')}>All Users</ToggleButton>
                    <ToggleButton style={{ backgroundColor: clickedButton === 'selectUser' ? Constant.color[0] : 'inherit', color: clickedButton === 'selectUser' ? 'white' : Constant.color[0], }} value="selectUser" onClick={(e) => handleClick(e, 'selectUser')}>Select Users</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            <Grid bgcolor={Constant.color[1]} sx={{ borderRadius: '5px', paddingRight: '10px' }} item xs={12}>

                {
                    alignment === 'allUser' ?
                        <Grid paddingBottom={2} marginTop={2} bgcolor={Constant.color[1]} marginX={4} padding={2} item xs={12}>

                            <Container sx={{ marginTop: '20px' }}>
                                <form >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Title"
                                                variant="outlined"
                                                fullWidth
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                error={error1}
                                                helperText={error1}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Message"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                error={error2}
                                                helperText={error2}
                                            />
                                        </Grid>
                                        <Grid marginBottom={2} item xs={12}>
                                            <Box marginBottom={7} onClick={handleSubmit1}>
                                                <New name='Send' />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Container>
                        </Grid> :
                        <Grid paddingBottom={2} marginTop={2} bgcolor={Constant.color[1]} marginX={4} padding={2} item xs={12}>
                            {/* <Dropdown options={options} label="Users" setSelectedList={setSelectedList} /> */}
                            <Container sx={{ marginTop: '20px' }}>
                                <form >

                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <SelectSearch options={options} label="Users" setSelectedList={setSelectedList} />

                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Title"
                                                variant="outlined"
                                                fullWidth
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                error={error3}
                                                helperText={error3}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Message"
                                                variant="outlined"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                error={error4}
                                                helperText={error4}
                                            />
                                        </Grid>
                                        <Grid marginBottom={2} item xs={12}>
                                            <Box marginBottom={7} onClick={handleSubmit2}>
                                                <New name='Send' />
                                            </Box>

                                        </Grid>
                                    </Grid>
                                </form>
                            </Container>
                        </Grid>

                }


            </Grid>
        </Box >

    )
}

export default Broadcast
