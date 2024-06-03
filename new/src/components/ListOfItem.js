import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Constant from '../Config/Color'
const ListOfItem = (props) => {
    const navigate = useNavigate()

    return (
        <ListItemButton
            onClick={() => { navigate(props.path); }}
            onMouseOver={props.handleMouseOver}
            onMouseOut={props.handleMouseOut}
            style={{ background: props.hover ? '#ffffff' : Constant.color[2] }}
        // sx={{ backgroundColor: props.hover ? '#ffffff' : Constant.color[0] }}
        >
            <ListItemIcon>
                {props.icon}
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant="body1" sx={{ color: props.hover ? 'black' : 'white', fontSize: '15px' }}  >
                        {props.name}
                    </Typography>
                }
            />
        </ListItemButton>

    )
}

export default ListOfItem
