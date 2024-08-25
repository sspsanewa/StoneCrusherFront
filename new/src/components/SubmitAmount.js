import React from 'react';
import Swal from 'sweetalert2';
import { Box, Button } from '@mui/material';  // Adjust the import according to your UI library
import axios from 'axios';
import { APP_PREFIX_PATH } from '../Config/AppConfig';
import { useNavigate } from 'react-router-dom';

const SubmitAmount = (props) => {
    const navigate = useNavigate()
    const handleAlert = async () => {
        props.setAnchorEl(null)
        const { value: amount } = await Swal.fire({
            title: 'Enter Amount',
            input: 'number',
            inputLabel: 'Amount',
            inputPlaceholder: 'Enter amount',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to enter an amount!';
                }
            }
        });

        if (amount) {
            // Handle the submitted amount here
            console.log('Submitted amount:', amount);
            axios.post(`http://localhost:8080/api/v1/client/submit/amount/${props.id}`, { 'submitAmount': amount })
                .then(res => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Expense added successfully.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false
                    })
                        .then(res => {
                            props.render ? props.setRender(false) : props.setRender(true)

                            navigate(`/${APP_PREFIX_PATH}/clientlist`)
                        })
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Amount not added successfully.',
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false
                    })
                })
        }
    };







    return (
        <Box paddingX={2} display={'flex'} alignItems={'center'} gap={1} sx={{ '&:hover': { backgroundColor: 'lightgray' } }}>
            {props.deleteIcon}
            <Button onClick={handleAlert}>Submit Amount</Button>
        </Box>
    );
};

export default SubmitAmount;
