import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Constant from '../Config/Color'
import { styled } from '@mui/material';


const New = ({ name }) => {
    const [buttonClicked, setButtonClicked] = useState(false);

    const handleClicked1 = () => {
        setButtonClicked(true);
        // Add your search functionality here
    };

    const handleClicked2 = () => {
        setButtonClicked(false);
        // Add your search functionality here
    };
    return (
        <Button
            sx={{ marginTop: '25px' }}
            onMouseEnter={handleClicked1}
            onMouseOut={handleClicked2}
            size='small'
            variant='contained'
            style={{
                backgroundColor: buttonClicked ? '#ffffff' : Constant.color[0],
                color: buttonClicked ? Constant.color[0] : '#ffffff' // Change text color to red when button clicked
            }}
        >
            {name}
        </Button>
    );
};

export default New;
