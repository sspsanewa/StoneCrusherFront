import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ListOfItem = (props) => {
    const navigate = useNavigate()
    return (
        <ListItemButton
            onClick={() => { props.setComponent(props.component); navigate(props.path) }}
            onMouseOver={props.handleMouseOver}
            onMouseOut={props.handleMouseOut}
            sx={{ backgroundColor: props.hover ? 'white' : 'black' }}
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
