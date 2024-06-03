import { Box, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Constant from '../Config/Color'
import VisibilityIcon from '@mui/icons-material/Visibility';

const CardBox = styled(Box)(({ theme }) => ({
    flex: 2,
    // backgroundImage: `linear-gradient(to right, #0d47a1    , #1e88e5 )`,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '80px',
    padding: '25px',
    textAlign: 'center',
    rowGap: '20px',
    paddingTop: '30px',
    paddingBottom: '30px'
}))

const Card = (props) => {
    const navigate = useNavigate();
    const [bg, setBg] = useState(Constant.color[1])
    const [col, setCol] = useState('black')
    return (
        <CardBox borderRadius={2} style={{ background: bg }} onClick={() => navigate(props.nav)}
            onMouseEnter={() => {
                setCol('#ffffff')
                return bg === "#ffffff" && setBg(Constant.color[0])
            }
            }
            onMouseLeave={() => {
                setCol('black')
                return bg === Constant.color[0] && setBg('#ffffff')
            }
            }
        >
            <Box bgcolor={Constant.color[0]} borderRadius={'15%'} width={'50px'} color={col}>
                {props.icon}
            </Box>
            <Box display={'flex'} gap={5} alignItems={'center'} >
                <Typography fontSize={16} color={col}>
                    {props.title}
                </Typography>
                <Typography color={col} fontSize={16}>
                    {props.users}
                </Typography>
            </Box>
            <Box display={'flex'} gap={1}>

                <VisibilityIcon sx={{ color: col }} />
                <Typography color={col} fontSize={16} onClick={() => navigate(props.viewPath)}>View</Typography>
            </Box>

        </CardBox>
    )
}

export default Card


