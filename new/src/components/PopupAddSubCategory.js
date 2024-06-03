import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box, Grid, TextField } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import Constant from '../Config/Color'
import Url from '../Config/Url'
import axios from 'axios'
import Console from '../debug_log';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SelectSearch from './SelectSearch';
import SelectSearchCategory from './SelectSearchCategory';

const PopupAddSubCategory = (props) => {

    const navigate = useNavigate()
    const [categoryId, setCategoryId] = React.useState('');
    const [subCategory, setSubCategory] = useState('')
    const [open, setOpen] = React.useState(false)
    const [error1, setError1] = useState('');
    const [message, setMessage] = useState('')
    const [selectedList, setSelectedList] = React.useState([])

    const handleChange1 = (e) => {
        const { value } = e.target;
        setSubCategory(value);

        if (subCategory !== '') {
            setError1('')
        }
    }

    const handleAdd = (event) => {
        event.preventDefault();

        if (subCategory === '') {
            setError1('Please enter sub category')
        } else if (subCategory !== '') {
            setError1('')

            try {

                const data = {
                    action: 'Add_sub_category',
                    category_id: categoryId.id,
                    title: subCategory,
                }
                Console("data", data)

                axios.post(`${Url}/manage_controller/add_sub_category`, data)
                    .then(obj => {
                        const res = obj.data;
                        console.log("res", res.success)
                        if (res.success) {
                            props.setShow(true)
                            setOpen(false)
                            props.render ? props.setRender(false) : props.setRender(true)
                            setMessage(res.msg)
                        }
                    })
                    .catch(err => {
                        Console("error", err)
                    })
            } catch (err) {
                Console("error", err)
            }

        }

    }


    const options = props.options
    Console("Options", options)
    Console("select", options)


    return (

        <Box >
            <Box onClick={() => setOpen(true)} variant="contained" color="primary" >
                {props.button}
            </Box>
            {

                <Dialog onClose={() => setOpen(false)} open={open} maxWidth="lg">
                    <Box marginX={2} margin={1} border='3px solid gray' borderRadius={'10px'} display={'flex'} flexDirection={'column'} sx={{ width: { xs: '300px', md: '600px' }, height: '300px' }} paddingLeft={{ xs: 5, md: 15 }} paddingRight={{ xs: 5, md: 25 }} paddingTop={{ xs: 2, md: 4 }} >
                        <Typography marginBottom={2} fontSize={20} color={'gray'}>{props.button}</Typography>
                        <Typography marginBottom={2} fontSize={16} color={'gray'}>Category List</Typography>

                        <Grid item xs={12}>
                            <SelectSearchCategory setCategoryId={setCategoryId} options={options} label="Users" setSelectedList={setSelectedList} />
                        </Grid>
                        {/* 
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryId}
                                    label="Select"
                                    onChange={handleChange}
                                    error={error1}
                                    helperText={error1}
                                >
                                    {options.map((option) => (
                                        <MenuItem key={option.value} value={option.id}>
                                            {option.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box> */}

                        <TextField
                            label="Sub Category"
                            variant="outlined"
                            error={error1}
                            helperText={error1}
                            sx={{ marginTop: '10px', marginBottom: '20px', width: '100%' }}
                            value={subCategory}
                            onChange={handleChange1}
                        />

                        <Box marginTop={2} display={'flex'} justifyContent={'right'} alignItems={'center'}>
                            <Button
                                color="primary"

                                onClick={() => setOpen(false)}
                                sx={{
                                    marginBottom: '5%',
                                    marginRight: '5%',
                                }}
                                size='small'
                                variant='outlined'
                            >
                                Cancel
                            </Button>
                            <Button
                                color="primary"

                                onClick={handleAdd}
                                style={{
                                    marginBottom: '5%',
                                    marginRight: '5%',
                                    backgroundColor: Constant.color[0]
                                }}
                                size='small'
                                variant='contained'
                            >
                                Add
                            </Button>
                        </Box>
                    </Box>

                </Dialog>
            }

        </Box>
    );
};

export default PopupAddSubCategory;
