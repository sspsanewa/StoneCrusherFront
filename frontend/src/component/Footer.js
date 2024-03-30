import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <Box
            position="fixed"
            bottom={0}
            left={0}
            width="100%"
            bgcolor="#212121"
            zIndex={1000} // Ensures footer stays above other content
            marginTop={2}
            paddingX={2}
        >
            <Divider />
            <Grid
                paddingBottom={3}
                marginTop={4}
                sx={{ fontFamily: 'sans-serif' }}
                display='flex'
                justifyContent='center'
                item xs={12}
            >
                <Link to='https://www.youngdecade.com/'><Typography fontSize={15} color='#ffffff'>2020 © YOUNG DECADE IT SOFTWARE SOLUTION (www.youngdecade.com)</Typography></Link>
            </Grid>
        </Box>
    )
}

export default Footer;
