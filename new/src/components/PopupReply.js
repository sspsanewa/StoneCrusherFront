import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Constant from '../Config/Color'
import Url from '../Config/Url'
import axios from 'axios'
import Console from '../debug_log';
import New from '../pages/New';

const PopupReply = (props) => {
    Console("props", props)
    const navigate = useNavigate()
    const [subject, setSubject] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [open, setOpen] = React.useState(false)
    const [error1, setError1] = useState('');
    const [error2, setError2] = useState('');


    const handleChange1 = (e) => {
        const { value } = e.target;
        setSubject(value);

        if (subject !== '') {
            setError1('')
        }

    }

    const handleChange2 = (e) => {
        const { value } = e.target;
        setMessage(value);

        if (message !== '') {
            setError2('')
        }

    }

    const handleSend = (event) => {
        event.preventDefault();

        if (subject !== '') {
            setError1('')
        }
        if (message !== '') {
            setError2('')
        }
        if (subject === '' && message === '') {
            setError1('Please enter subject')
            setError2('Please enter your message')
            return
        }
        if (subject === '') {
            setError1('Please enter subject ')
            return
        }
        if (message === '') {
            setError2('Please enter your message')
            return
        }
        Console("prop.id", props.id)
        if (subject !== '' && message !== '') {
            try {
                const data = {
                    action: 'reply',
                    contact_id: props.id,
                    reply_message: message,
                    subject: subject
                }
                Console("data", data)

                axios.post(`${Url}/common_controller/reply_contactus`, data)
                    .then(obj => {
                        const res = obj.data;
                        if (res.success) {
                            props.setShow1(true)
                            setOpen(false)
                            props.setAnchorEl(null);
                            props.render ? props.setRender(false) : props.setRender(true)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            } catch (err) {
                console.log(err);
            }

        }

    }

    return (

        <Box >
            <Button onClick={() => setOpen(true)} color="primary" >
                {props.button}
            </Button>
            {

                <Dialog onClose={() => setOpen(false)} open={open} maxWidth="lg">
                    <Box marginX={2} margin={1} border='3px solid gray' borderRadius={'10px'} display={'flex'} flexDirection={'column'} sx={{ width: { xs: '200px', md: '600px' }, height: '500px' }} paddingLeft={{ xs: 5, md: 15 }} paddingRight={{ xs: 5, md: 25 }} paddingTop={{ xs: 2, md: 4 }} >
                        <Typography fontSize={20}><b>{props.button}</b></Typography>
                        <Typography fontSize={18}>Subject</Typography>

                        <TextField
                            label="Subject"
                            variant="outlined"
                            error={error1}
                            helperText={error1}
                            sx={{ marginTop: '10px', marginBottom: '20px', width: '100%' }}
                            value={subject}
                            onChange={handleChange1}
                        />
                        <Typography fontSize={18}>Message</Typography>

                        <TextField
                            sx={{ marginTop: '10px', width: '100%' }}
                            label="Message"
                            variant="outlined"
                            fullWidth
                            multiline
                            error={error2}
                            helperText={error2}
                            rows={6}
                            value={message}
                            onChange={handleChange2}
                        />
                        <Box marginTop={2} display={'flex'} justifyContent={'right'} alignItems={'center'}>
                            <Button

                                onClick={() => setOpen(false)}
                                sx={{
                                    marginBottom: '5%',
                                    marginRight: '5%',
                                    color: Constant.color[0],
                                    border: `1px solid ${Constant.color[0]} `
                                }}
                                size='small'
                                variant='outlined'
                            >
                                Cancel
                            </Button>
                            <Box marginBottom={7} onClick={handleSend}>
                                <New name='Send' />
                            </Box>
                        </Box>
                    </Box>

                </Dialog>
            }

        </Box>
    );
};

export default PopupReply;
