import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IMAGE_PATH } from '../Config/AppConfig';
import Constant from '../Config/Color'
import { Avatar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    bgcolor: Constant.color[0]
};

export default function PopupImage(props) {
    const [open, setOpen] = React.useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => { setOpen(false); props.setClickImage(false) };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box position={'relative'} borderRadius={'10px'} sx={style}>
                    <Box display={'flex'} justifyContent={'center'}>

                        <Avatar id='img' style={{ borderRadius: '10px', width: '200px', height: '200px' }} width='200px' alt={props.name} src={`${IMAGE_PATH}` + props.images} />
                        <Box border={'2px solid #ffffff'} borderRadius={'100%'} sx={{ position: 'absolute', right: -18, top: -18 }}>
                            <CloseIcon onClick={handleClose} fontSize='large' sx={{ color: '#ffffff' }} />
                        </Box>

                    </Box>
                </Box>
            </Modal>
        </div >
    );
}
