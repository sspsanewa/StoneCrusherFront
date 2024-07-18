import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import profile1 from '../assets/profile1.jpg'
import axios from 'axios';
import Constant from '../Config/Color'
import Url from '../Config/Url';
import Console from '../debug_log'
import { APP_PREFIX_PATH, IMAGE_PATH } from '../Config/AppConfig';
import PopupImage from '../components/PopupImage';
import { Helmet } from 'react-helmet';
import Language from '../Config/Language'


export default function ViewDeleteUser() {
    let { id } = useParams()
    id = btoa(id.toString());

    const [user, setUser] = useState([])
    const navigate = useNavigate()

    const [clickImage, setClickImage] = useState(false)
    const [clickedButton, setClickedButton] = React.useState('my');


    const [alignment, setAlignment] = useState('my');

    const handleClick = (event, newAlignment) => {
        setAlignment(newAlignment);
        setClickedButton(newAlignment);

    };

    React.useEffect(() => {
        const params = { action: 'get_user_details', user_id: id };

        axios.get(`${Url}/user_controller/view_user/`, { params })
            .then(obj => {
                const res = obj.data;
                setUser(res.data.user_arr);
            })
            .catch(err => console.log(err))
    }, [])
    Console('deleted user', user)
    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Helmet>
                <title>{Language.APP_NAME} | Manage Users | Deleted Users List | View Deleted Users List </title>
            </Helmet>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box marginBottom={2} gap={1} display={'flex'}>
                    <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                        Dashboard
                    </Button>
                    <Typography marginTop={1.2} fontSize={20} >/</Typography>


                    <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/deletedUserList`)}  >
                        Manage Deleted Users Lis
                    </Button>

                    <Typography marginTop={1.2} fontSize={20} >/</Typography>

                    <Typography marginTop={1.2} fontSize={20} >View Deleted Users</Typography>

                </Box>
            </Box>
            <Paper sx={{ borderRadius: '5px', padding: '20px' }}>
                <Typography fontSize={18} color={'gray'}>Personal Details</Typography>

                <Box marginLeft={1}>
                    <Avatar style={{ borderRadius: '100%', width: '100px', height: '100px' }} onClick={() => setClickImage(true)} id='img' alt={user.name && user.name.charAt(0).toUpperCase()} src={`${IMAGE_PATH}` + user.image} />
                    {clickImage && <PopupImage images={user.image} name={user.name} setClickImage={setClickImage} />
                    }
                </Box>
                <Box>
                    <Grid display={'flex'} item xs={12}>
                        <Grid item xs={6}>
                            <Grid display={{ xs: 'block', md: 'flex' }} item xs={12}>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>First Name:</Typography>
                                </Grid>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>{user.f_name ? user.f_name : 'NA'}</Typography>
                                </Grid>
                            </Grid>
                            <Grid display={{ xs: 'block', md: 'flex' }} item xs={12}>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>Last Name:</Typography>
                                </Grid>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>{user.l_name ? user.l_name : 'NA'}</Typography>
                                </Grid>
                            </Grid>
                            <Grid display={{ xs: 'block', md: 'flex' }} item xs={12}>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>Email:</Typography>
                                </Grid>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>{user.email ? user.email : 'NA'}</Typography>
                                </Grid>
                            </Grid>
                            <Grid display={{ xs: 'block', md: 'flex' }} item xs={12}>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>Mobile:</Typography>
                                </Grid>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>{user.mobile ? user.mobile : 'NA'}</Typography>
                                </Grid>
                            </Grid>
                            <Grid display={{ xs: 'block', md: 'flex' }} item xs={12}>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>Status:</Typography>
                                </Grid>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    {user.active_flag === 0 ? <Typography color={'red'} margin={2}>Deactive</Typography> : <Typography color={'green'} margin={2}>Active</Typography>

                                    }
                                </Grid>
                            </Grid>
                            <Grid display={{ xs: 'block', md: 'flex' }} item xs={12}>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>DOB:</Typography>
                                </Grid>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>{user.dob ? user.dob : 'NA'}</Typography>
                                </Grid>
                            </Grid>
                            <Grid display={{ xs: 'block', md: 'flex' }} item xs={12}>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>Zip code :</Typography>
                                </Grid>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>{user.zipcode ? user.zipcode : 'NA'}</Typography>
                                </Grid>
                            </Grid>
                            <Grid display={{ xs: 'block', md: 'flex' }} item xs={12}>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>Bio :</Typography>
                                </Grid>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>{user.bio ? user.bio : 'NA'}</Typography>
                                </Grid>
                            </Grid>
                            <Grid display={{ xs: 'block', md: 'flex' }} item xs={12}>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>Registration On :</Typography>
                                </Grid>
                                <Grid width={200} height={50} display={'flex'} item xs={6}>
                                    <Typography margin={2}>{(user.createtime) ? (user.createtime) : 'NA'}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <ToggleButtonGroup
                color='primary'
                value={alignment}
                exclusive
                aria-label="Platform"
                sx={{ marginTop: '10px' }}
            >
                <ToggleButton style={{ backgroundColor: clickedButton === 'my' ? Constant.color[0] : 'inherit', color: clickedButton === 'my' ? 'white' : Constant.color[0], }} value="my" onClick={(e) => handleClick(e, 'my')}>My MUSA</ToggleButton>
                <ToggleButton style={{ backgroundColor: clickedButton === 'contributor' ? Constant.color[0] : 'inherit', color: clickedButton === 'contributor' ? 'white' : Constant.color[0], }} value="contributor" onClick={(e) => handleClick(e, 'contributor')}>Contributor MUSA</ToggleButton>
            </ToggleButtonGroup>
            {/* {alignment === 'my' ?
                <TableMyMusas id={id} />
                :
                (
                    alignment === 'contributor' && <TableContributor id={id} />
                )
            } */}
        </Box>
    );
}
