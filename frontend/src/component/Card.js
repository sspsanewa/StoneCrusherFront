import { Box, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const CardBox = styled(Box)(({ theme }) => ({
    flex: 2,
    // backgroundImage: `linear-gradient(to right, #0d47a1    , #1e88e5 )`,
    display: 'flex',
    justifyContent: 'space-between',
    height: '135px',
    padding: '25px',
    textAlign: 'center',
    marginTop: '20px'
}))

const Card = (props) => {
    const navigate = useNavigate();
    const [bg, setBg] = useState('#ffffff')
    return (
        <CardBox bgcolor={bg} onClick={() => navigate(props.nav)}
            onMouseOver={() => bg === "#ffffff" && setBg('#e3f2fd')}
            onMouseOut={() => bg === "#e3f2fd" && setBg('#ffffff')}

        >
            <Box >
                {props.icon}
            </Box>
            <Box >
                <Typography>
                    {props.title}
                </Typography>
                <Typography variant='h5'>
                    {props.users}
                </Typography>
            </Box>
        </CardBox>
    )
}

export default Card
