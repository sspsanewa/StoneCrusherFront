

import { useRef } from 'react';
import generatePDF from 'react-to-pdf';
import Template from './Template';
import { Box, Button, Paper, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import New from '../pages/New';
import Constant from '../Config/Color'

const Bill = () => {
    const targetRef = useRef();
    return (
        <Paper sx={{ marginBottom: '70px', borderRadius: '10px', padding: '20px', bgcolor: Constant.color[1] }}>
            <Box ref={targetRef}>
                <Template />
            </Box>
            <Box display={'flex'} justifyContent={'center'} onClick={() => { generatePDF(targetRef, { filename: 'page.pdf' }) }}>
                <Box >
                    <New name='Download Bill' />
                </Box>
            </Box>
        </Paper>
    )
}

export default Bill;
