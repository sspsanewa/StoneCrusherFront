import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { LinearProgress } from '@mui/material';
import { BallTriangle, ColorRing, DNA } from 'react-loader-spinner';
export default function Load() {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <ColorRing
                    visible={true}
                    height="250"
                    width="250"
                    ariaLabel="color-ring-loading"
                    wrapperStyle={{}}
                    wrapperClass="color-ring-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
            </Backdrop>
        </div>
    );
}
