import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import profile1 from '../assets/profile1.jpg'
import axios from 'axios';
import TableImages from '../components/TableImages';
import Constant from '../Config/Color'
import TableVideos from '../components/TableVideo';
import TableAudios from '../components/TableAudio';
import image2 from '../assets/image2.jpg'
import TableLikes from '../components/TableLikes';
import TableComments from '../components/TableComments';
import Url from '../Config/Url';
import Console from '../debug_log';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import { Helmet } from 'react-helmet';
import Language from '../Config/Language'


export default function ViewTrip() {
    let { id } = useParams()
    id = btoa(id.toString());

    const [musa, setMusa] = useState([])

    const navigate = useNavigate()
    const [clickedButton, setClickedButton] = React.useState('likes');



    const [alignment, setAlignment] = useState('likes');

    const handleClick = (event, newAlignment) => {
        setAlignment(newAlignment);
        setClickedButton(newAlignment);

    };
    React.useEffect(() => {

        const params = { action: 'get_musa_details', musa_id: id };
        axios.get(`${Url}/manage_controller/musa_details`, { params })
            .then(obj => {
                const res = obj.data;
                setMusa(res.data.musa_arr[0]);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Box paddingY={4} paddingX={8} marginBottom={10} >
            <Helmet>
                <title>{Language.APP_NAME} | Manage MUSAS | MUSAS List | View MUSA</title>
            </Helmet>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Box marginBottom={2} gap={1} display={'flex'}>
                    <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/dashboard`)}  >
                        Dashboard
                    </Button>
                    <Typography marginTop={1.2} fontSize={20} >/</Typography>

                    <Button sx={{ color: Constant.color[0], fontSize: 22, textTransform: 'none' }} onClick={() => navigate(`/${APP_PREFIX_PATH}/musalist`)}  >
                        Manage MUSA List
                    </Button>

                    <Typography marginTop={1.2} fontSize={20} >/</Typography>

                    <Typography marginTop={1.2} fontSize={20} >View MUSA</Typography>

                </Box>
            </Box>
            <Paper sx={{ borderRadius: '10px', padding: '20px', bgcolor: Constant.color[1] }}>
                <Typography fontSize={18} color={'gray'}>MUSA Details</Typography>
                <Box marginLeft={1} >
                    <img style={{ borderRadius: '15px' }} width={300} src={image2} alt='image2' />
                </Box>
                <Box>
                    <Grid display={'flex'} item xs={12}>
                        <Grid item xs={6}>

                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>Created By :</Typography>
                            </Grid>
                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>Caption :</Typography>
                            </Grid>

                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>Category :</Typography>
                            </Grid>
                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>Sub Category :</Typography>
                            </Grid>
                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>Musa Type :</Typography>
                            </Grid>
                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>Create Date :</Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>

                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>{musa.name}</Typography>
                            </Grid>
                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>{musa.description}</Typography>
                            </Grid>

                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>{musa.category_title}</Typography>
                            </Grid>
                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>{musa.sub_category_title}</Typography>
                            </Grid>
                            <Grid display={'flex'} xs={12}>
                                {musa.type === 0 ? <Typography margin={2} variant='outlined' size='small' style={{ height: '25px', color: '#00c853' }} >Public</Typography> :
                                    (musa.type === 1 ? <Typography margin={2} variant='outlined' size='small' style={{
                                        height: '25px', color: '#00e5ff'
                                    }} >Contributtor</Typography> :
                                        <Typography margin={2} variant='outlined' size='small' style={{
                                            height: '25px', color: '#00838f'
                                        }} >Only me</Typography>
                                    )
                                }
                            </Grid>
                            <Grid display={'flex'} xs={12}>
                                <Typography margin={2}>	{musa.createtime}</Typography>
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
                <ToggleButton style={{ backgroundColor: clickedButton === 'likes' ? Constant.color[0] : 'inherit', color: clickedButton === 'likes' ? 'white' : 'blue', }} value="likes" onClick={(e) => handleClick(e, 'likes')}>Likes</ToggleButton>
                <ToggleButton style={{ backgroundColor: clickedButton === 'comments' ? Constant.color[0] : 'inherit', color: clickedButton === 'comments' ? 'white' : 'blue', }} value="comments" onClick={(e) => handleClick(e, 'comments')}>Comments</ToggleButton>
                <ToggleButton style={{ backgroundColor: clickedButton === 'images' ? Constant.color[0] : 'inherit', color: clickedButton === 'images' ? 'white' : 'blue', }} value="images" onClick={(e) => handleClick(e, 'images')}>Images</ToggleButton>
                <ToggleButton style={{ backgroundColor: clickedButton === 'videos' ? Constant.color[0] : 'inherit', color: clickedButton === 'videos' ? 'white' : 'blue', }} value="videos" onClick={(e) => handleClick(e, 'videos')}>Videos</ToggleButton>
                <ToggleButton style={{ backgroundColor: clickedButton === 'audios' ? Constant.color[0] : 'inherit', color: clickedButton === 'audios' ? 'white' : 'blue', }} value="audios" onClick={(e) => handleClick(e, 'audios')}>Audio</ToggleButton>

            </ToggleButtonGroup>
            <Box marginTop={2} bgcolor={'#ffffff'} padding={2} borderRadius={'10px'}>
                {alignment === 'likes' && <TableLikes id={id} />}
                {alignment === 'comments' && <TableComments id={id} />}
                {alignment === 'images' && <TableImages id={id} />}
                {alignment === 'videos' && <TableVideos id={id} />}
                {alignment === 'audios' && <TableAudios id={id} />}
            </Box>
        </Box>
    );
}
