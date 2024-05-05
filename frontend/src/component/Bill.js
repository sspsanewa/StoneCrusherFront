

import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import UserList from './UserList';
import Template from './Template';
import { Box, Button, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import gif from '../Images/gif.gif'
const Bill = () => {
    const targetRef = useRef();
    return (
        <Box >
            <Box ref={targetRef}>
                <Template />
            </Box>
            <Box display={'flex'} justifyContent={'center'} onClick={() => { generatePDF(targetRef, { filename: 'page.pdf' }) }}>
                <img src={gif} alt='gif' />
            </Box>
        </Box>
    )
}

export default Bill;

