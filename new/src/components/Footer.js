import React from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Color from '../Config/Color'



const Footer = ({ language }) => {
    const navigate = useNavigate()
    return (
        <Box
            width={'98.5%'}
            bgcolor="#ffffff"
            zIndex={1000} // Ensures footer stays above other content
            marginTop={2}
            paddingX={1}
        >
            <Divider />
            <Grid
                paddingBottom={2}
                marginTop={2}
                sx={{ fontFamily: 'sans-serif' }}
                display='flex'
                justifyContent='center'
                item xs={12}
            >
                <Button href='https://www.youngdecade.com/' sx={{ color: Color.color[0] }}>Copyright © YOUNG DECADE IT SOFTWARE SOLUTION</Button>
            </Grid>
        </Box>
    )
}

export default Footer;
