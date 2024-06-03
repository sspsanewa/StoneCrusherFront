import React, { useState } from 'react'
import { Box, Grid, Typography, } from '@mui/material'
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import Url from '../Config/Url'
import axios from 'axios'
import Console from '../debug_log'

const TableVideos = (props) => {
    const [videos, setVideos] = useState([])
    const [show, setShow] = useState(false)
    React.useEffect(() => {

        const params = {
            action: 'get_musa_videos', musa_id: props.id
        }
        axios.get(`${Url}/manage_controller/musa_videos`, { params })
            .then(obj => {
                if (obj.data.success) {
                    const res = obj.data;
                    setVideos(res.data.video_arr)
                    setShow(true)
                }
            })
            .catch(err => console.log(err))
    }, [])


    Console("videos", videos)
    return (
        <Box>
            <Typography marginBottom={4} fontSize={18} color={'gray'}>Videos</Typography>

            {show &&
                <Grid padding={2} container spacing={2} gap={20}>
                    {/* <Grid xs={6} md={3}>
                        <img width={300} src={"https://meribhiapp.com/2024/musaapp/assets/videos/" + videos[0].thumbnail_image} alt='image1' />
                    </Grid>
                    <Grid xs={6} md={3}>
                        <img width={300} src={"https://meribhiapp.com/2024/musaapp/assets/videos/" + videos[0].thumbnail_image} alt='image2' />
                    </Grid> */}
                    <Grid xs={6} md={3}>
                        <video controls>
                            <source src={"https://meribhiapp.com/2024/musaapp/server/assets/images/" + videos[0].thumbnail_image} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Grid>
                </Grid>
            }

        </Box>
    )
}

export default TableVideos