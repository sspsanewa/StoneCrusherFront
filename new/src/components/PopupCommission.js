// import React, { useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import { Box, TextField } from '@mui/material';
// import LoginIcon from '@mui/icons-material/Login';
// import { useNavigate } from 'react-router-dom';
// import Constant from '../Config/Constant'
// import { Subject } from '@mui/icons-material';
// const PopupCommisssion = (props) => {

//     const navigate = useNavigate()
//     const [subject, setSubject] = React.useState('');
//     const [message, setMessage] = React.useState('');
//     const [open, setOpen] = React.useState(false)
//     const [error1, setError1] = useState('');
//     const [error2, setError2] = useState('');
//     const handleSend = () => {
//         if (subject !== '') {
//             setError1('')
//         }
//         if (message !== '') {
//             setError2('')
//         }
//         if (subject === '' && message === '') {
//             setError1('Please enter subject')
//             setError2('Please enter your message')
//             return
//         }
//         if (subject === '') {
//             setError1('Please enter subject ')
//             return
//         }
//         if (message === '') {
//             setError2('Please enter your message')
//             return
//         }

//         if (subject !== '' && message !== '') {
//             props.setShow(true)
//             setOpen(false)

//         }
//     }

//     return (

//         <Box >
//             <Box onClick={() => setOpen(true)} variant="contained" color="primary" >
//                 {props.button}
//             </Box>
//             {

//                 <Dialog open={open} maxWidth="lg">
//                     <Box marginX={2} marginY={1} border='3px solid #ff5722' borderRadius={'10px'} display={'flex'} flexDirection={'column'} sx={{ width: { xs: '300px', md: '600px' }, height: '500px' }} paddingLeft={{ xs: 5, md: 15 }} paddingRight={{ xs: 5, md: 25 }} paddingY={{ xs: 2, md: 4 }} >

//                         <Box padding={15} style={{ textAlign: 'center' }}>
//                             <LoginIcon fontSize='large' sx={{ color: 'green' }} />
//                             <Typography fontSize={20}><b>{props.button}</b></Typography>
//                             <Typography fontSize={15} variant="body1">{props.message}</Typography>
//                         </Box>

//                         <Box marginTop={2} display={'flex'} justifyContent={'right'} alignItems={'center'}>
//                             <Button
//                                 color="primary"

//                                 onClick={() => setOpen(false)}
//                                 sx={{
//                                     marginBottom: '5%',
//                                     marginRight: '5%',
//                                 }}
//                                 size='small'
//                                 variant='outlined'
//                             >
//                                 Cancel
//                             </Button>
//                             <Button
//                                 color="primary"

//                                 onClick={handleSend}
//                                 sx={{
//                                     marginBottom: '5%',
//                                     marginRight: '5%',
//                                     bgcolor: Constant.color[0]
//                                 }}
//                                 size='small'
//                                 variant='contained'
//                             >
//                                 Send
//                             </Button>
//                         </Box>
//                     </Box>

//                 </Dialog>
//             }

//         </Box>
//     );
// };

// export default PopupCommisssion;


import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Constant from '../Config/Color'

const PopupCommission = (props) => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    const handleCommission = () => {
        props.setShow(true)
        setOpen(false)
    }
    return (
        <Box>
            <Box onClick={() => setOpen(true)} variant="contained" color="primary" >
                {props.button}
            </Box>
            {

                <Dialog onClose={() => setOpen(false)} open={open} maxWidth="xs">
                    <Box padding={15} style={{ textAlign: 'center' }}>
                        <img width={150} src='https://i.imgur.com/krsWHvd.gif' alt='qq' />
                        <Typography fontSize={20}><b>{props.button}</b></Typography>
                        <Typography fontSize={15} variant="body1">{props.message}</Typography>
                    </Box>
                    <Box marginTop={2} display={'flex'} justifyContent={'right'} alignItems={'center'}>

                        <Button
                            onClick={handleCommission}
                            style={{

                                marginBottom: '20px',
                                marginRight: '20px',
                                backgroundColor: Constant.color[0]
                            }}
                            size='small'
                            variant='contained'
                        >
                            Ok
                        </Button>
                    </Box>
                </Dialog>
            }

        </Box>
    );
};

export default PopupCommission;
