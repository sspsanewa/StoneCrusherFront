import React, { useState } from 'react'
import { Box, Grid, Typography, } from '@mui/material'
import image1 from '../assets/image1.jpg'
import image2 from '../assets/image2.jpg'
import Url from '../Config/Url'
import axios from 'axios'
import Console from '../debug_log'
import { IMAGE_PATH } from '../Config/AppConfig'

const TableImages = (props) => {
    const [images, setImages] = useState([])
    const [show, setShow] = useState(false)
    React.useEffect(() => {

        const params = {
            action: 'get_musa_images', musa_id: props.id
        }
        axios.get(`${Url}/manage_controller/musa_images`, { params })
            .then(obj => {
                if (obj.data.success) {
                    const res = obj.data;
                    setImages(res.data.image_arr)
                    setShow(true)
                }
            })
            .catch(err => console.log(err))
    }, [])


    Console("images", images)
    return (
        <Box>
            <Typography marginBottom={4} fontSize={18} color={'gray'}>Images</Typography>
            {show &&
                <Grid padding={2} container spacing={2} gap={20}>
                    <Grid xs={6} md={3}>
                        <img width={300} src={`${IMAGE_PATH}` + images[0].thumbnail_image} alt='image1' />

                    </Grid>
                    <Grid xs={6} md={3}>
                        <img width={300} src={`${IMAGE_PATH}` + images[0].thumbnail_image} alt='image2' />
                    </Grid>
                </Grid>
            }

        </Box>
    )
}

export default TableImages